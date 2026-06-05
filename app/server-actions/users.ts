"use server";

import { createClient } from "../../lib/supabase/server";
import { prisma } from "../../prisma/prisma";
import { handleError } from "../../lib/utils";
import { redirect } from "next/navigation";

export const signUpAction = async (email: string, password: string) => {
  console.log("Ran signup");
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({ email, password });
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("Error signing up");
    await prisma.user.create({
      data: {
        id: userId,
        email,
      },
    });
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const logInAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();
    const { data } = await auth.signInWithPassword({ email, password });
    const userId = data.user?.id;
    if (!userId) throw new Error("Error logging in");
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const logOutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut({ scope: "local" });

    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

"use server";

import { prisma } from "../../prisma/prisma";
import { handleError } from "../../lib/utils";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export const signUpAction = async (email: string, password: string) => {
  console.log("Ran signup");
  try {
    const { auth } = await createAdminClient();
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

export const deleteUserAction = async () => {
  try {
    const { auth } = await createAdminClient();
    const user = await getUser();
    if (!user?.id) {
      throw new Error("You must be logged in to delete your account");
    }
    const { error } = await auth.admin.deleteUser(user.id);

    if (error) throw error;
    prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    await auth.signOut();
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const logOutAction = async () => {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signOut();

    if (error) throw error;
    return { errorMessage: null };
  } catch (error) {
    console.log(error);
    return handleError(error);
  }
};

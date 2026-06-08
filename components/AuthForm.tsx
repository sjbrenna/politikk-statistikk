"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import AuthMode from "@/app/enums/authMode";
import { logInAction, signUpAction } from "@/app/server-actions/users";
import { startTransition, useMemo, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useDebounce from "@/app/hooks/useDebounce";
import { MIN_PASSWORD_LENGTH } from "@/lib/consts";
import { useRouter } from "next/navigation";

type Props = {
  mode: AuthMode;
};

function AuthForm({ mode }: Props) {
  const isSignUp = mode === AuthMode.SignUp;
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [validationPassword, setValidationPassword] = useState("");
  const debouncedPassword = useDebounce(password);
  const debouncedValidationPassword = useDebounce(validationPassword);
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    console.log("Trying to submit");
    if (validPasswordErrorMsg !== "") {
      toast.error(validPasswordErrorMsg);
      console.log("INVALID PASSWORD: " + validPasswordErrorMsg);
      return;
    }
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      let errorMessage = null;
      let title;
      let description;
      if (isSignUp) {
        errorMessage = (await signUpAction(email, password)).errorMessage;
        title = "Bruker registrert";
        description = "Sjekk email for konfirmasjonslenke";
      } else {
        errorMessage = (await logInAction(email, password)).errorMessage;
        title = "Logget inn";
        description = "";
      }
      console.log(errorMessage);
      if (!errorMessage) {
        toast.success(title, { description: description });
        router.push("/");
      } else {
        toast.error("Error", { description: errorMessage });
      }
    });
  };

  const validPasswordErrorMsg = isSignUp
    ? debouncedPassword.length < MIN_PASSWORD_LENGTH && debouncedPassword !== ""
      ? `Error: passordet må være minst ${MIN_PASSWORD_LENGTH} bokstaver langt`
      : debouncedPassword !== debouncedValidationPassword
        ? "Error: passordene må være like"
        : ""
    : "";

  const updatePassword = (val: string) => {
    setPassword(val);
  };

  const updateValidationPassword = (val: string) => {
    setValidationPassword(val);
  };

  return (
    <div className="max-w-md w-full">
      <form action={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>
              {isSignUp ? "Registrer ny bruker" : "Logg inn"}
            </CardTitle>
            <CardDescription>Fyll inn brukerinformasjon</CardDescription>
          </CardHeader>
          <CardContent className="gap-y-2 flex flex-col">
            <Label className="pt-2" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Skriv inn email..."
              type="email"
              required
            />
            <Label className="pt-2" htmlFor="password">
              Passord
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Skriv inn passord... "
              required
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
            />

            {isSignUp && (
              <div>
                <Label className="pt-2 pb-2" htmlFor="password-confirmation">
                  Gjenta passord
                </Label>
                <Input
                  type="password"
                  value={validationPassword}
                  name="password-confirmation"
                  id="password-confirmation"
                  placeholder="Gjenta passord..."
                  required
                  onChange={(e) => updateValidationPassword(e.target.value)}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 flex">
            <Button>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : isSignUp ? (
                "Registrer Bruker"
              ) : (
                "Logg Inn"
              )}
            </Button>
            {validPasswordErrorMsg !== "" && (
              <div className="text-red-400">{validPasswordErrorMsg}</div>
            )}
            <div>
              <div className="text-xs">
                {isSignUp ? (
                  <div>
                    Har du bruker?{" "}
                    <Link href={"/login"} className="infoLink">
                      {" "}
                      Logg inn
                    </Link>
                  </div>
                ) : (
                  <div>
                    Ingen bruker?{" "}
                    <Link href={"/sign-up"} className="infoLink">
                      Registrer bruker
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default AuthForm;

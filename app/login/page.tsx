import AuthForm from "@/components/AuthForm";
import AuthMode from "../enums/authMode";

function LoginPage() {
  return (
    <div className="flex flex-col w-full flex-1 items-center justify-center">
      <AuthForm mode={AuthMode.LogIn}></AuthForm>
    </div>
  );
}

export default LoginPage;

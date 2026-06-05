import AuthForm from "@/components/AuthForm";
import AuthMode from "../enums/authMode";
function SignUpPage() {
  return (
    <div className="flex flex-col w-full flex-1 items-center justify-center">
      <AuthForm mode={AuthMode.SignUp}></AuthForm>
    </div>
  );
}

export default SignUpPage;

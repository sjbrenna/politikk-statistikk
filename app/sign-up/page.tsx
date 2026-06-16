import AuthForm from "@/components/AuthForm";
import AuthMode from "../enums/authMode";
function SignUpPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center w-full">
      <AuthForm mode={AuthMode.SignUp} />
    </div>
  );
}

export default SignUpPage;

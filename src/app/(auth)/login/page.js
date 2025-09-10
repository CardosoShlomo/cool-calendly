import AuthAppbar from "@/app/(auth)/AuthAppbar";
import LinkButton from "@/components/LinkButton";
import { requireNoAuth } from "@/utils/supabase/serverRedirect";
import LoginForm from "../LoginForm";

export default async function LoginPage() {
  await requireNoAuth();

  return (
    <>
      <AuthAppbar>
        <LinkButton href="/signup">signup</LinkButton>
      </AuthAppbar>
      <br/>
      <br/>
      <LoginForm>Login</LoginForm>
    </>
  );
}

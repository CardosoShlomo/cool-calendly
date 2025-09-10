import AuthAppbar from "@/app/(auth)/AuthAppbar";
import { requireNoAuth } from "@/utils/supabase/serverRedirect";
import LoginForm from "../LoginForm";
import { supabase } from "@/utils/supabase/browser";
import LinkButton from "@/components/LinkButton";

export default async function SignupPage() {
  await requireNoAuth();

  return (
    <>
      <AuthAppbar>
        <LinkButton href="/login">login</LinkButton>
      </AuthAppbar>
      <br/>
      <br/>
      <LoginForm>Sign Up</LoginForm>
    </>
  );
}

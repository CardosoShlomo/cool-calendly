import AuthAppbar from "@/app/(auth)/AuthAppbar";
import LinkButton from "@/components/LinkButton";
import { requireNoAuth } from "@/utils/supabase/serverRedirect";

export default async function Home() {
  await requireNoAuth();

  return <>
    <AuthAppbar>
      <LinkButton href="/login">Login</LinkButton>
      <LinkButton href="/signup">signup</LinkButton>
    </AuthAppbar>
  </>
}

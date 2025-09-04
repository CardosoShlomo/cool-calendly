import { requireNoAuth } from "@/utils/supabase/serverRedirect";

export default async function SignupPage() {
  await requireNoAuth();

  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <button type="submit">Send Magic Link</button>
      </form>
    </div>
  );
}

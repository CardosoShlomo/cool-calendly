import { redirect } from "next/navigation";
import { getServerClient } from "./server";

export async function getConfirmedUser() {
  const supabase = await getServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) return null;

  // Only return user if email is confirmed
  if (!user.email_confirmed_at) return null;

  return user;
}

export async function requireNoAuth() {
  if (await getConfirmedUser()) {
    redirect("/scheduling");
  }
}

export async function requireAuth() {
  const user = await getConfirmedUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

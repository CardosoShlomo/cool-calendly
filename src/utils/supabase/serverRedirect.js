import { redirect } from "next/navigation";
import { getServerClient } from "./server";

export async function getConfirmedUser() {
  const supabase = await getServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  console.log("error", error);

  if (error || !user) return null;

  console.log("user", user);
  // Only return user if email is confirmed
  if (!user.confirmed_at) return null;

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
    // redirect("/login");
  }
  return user;
}

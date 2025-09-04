import { redirect } from "next/navigation";
import { getServerClient } from "./server";

export async function getUser() {
  const supabase = await getServerClient();
  console.log('befor');
  console.log(supabase.auth.getUser());
  console.log('after');
  const { data: { user } } = await supabase.auth.getUser()
  return user;
}

export async function requireNoAuth() {
  if (await getUser()) {
    redirect("/scheduling");
  }
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

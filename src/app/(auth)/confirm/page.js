import { requireNoAuth } from "@/utils/supabase/serverRedirect";
import { useSearchParams } from "next/navigation";

export default async function ConfirmPage() {
  await requireNoAuth();

  const params = useSearchParams();
  const email = params.get("email");
  const token = params.get("token");

  return (
    <div>
      <h1>Confirm Email</h1>
      <p>Confirming {email}...</p>
    </div>
  );
}

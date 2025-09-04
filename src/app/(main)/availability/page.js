import { requireAuth } from "@/utils/supabase/serverRedirect";

export default async function AvailabilityPage() {
  const session = await requireAuth();
  return (
    <div>
      <h1>Availability</h1>
      <p>Set your available times here.</p>
    </div>
  );
}

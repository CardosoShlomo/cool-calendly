import { requireAuth } from "@/utils/supabase/serverRedirect";

export default async function SchedulingPage() {
  const session = await requireAuth();
  return (
    <div>
      <h1>Scheduling</h1>
      <p>Create and manage your scheduling links.</p>
    </div>
  );
}

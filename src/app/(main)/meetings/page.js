import { requireAuth } from "@/utils/supabase/serverRedirect";

export default async function MeetingsPage() {
  const session = await requireAuth();
  return (
    <div>
      <h1>Meetings</h1>
      <p>List of your upcoming and past meetings.</p>
    </div>
  );
}

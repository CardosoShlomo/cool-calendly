import Container from "@/components/cursors/Container";
import { requireNoAuth } from "@/utils/supabase/serverRedirect";

export default async function Home() {
  await requireNoAuth();

  return <Container style={{
    padding: 10,
  }}>
    <Container style={{
      margin: 10,
    }}>hi</Container>
    <Container style={{
      padding: 30,
    }}>there</Container>
  </Container>
}

import Container from "@/components/Container";
import DrawerItem from "./DrawerItem";
import { requireAuth } from "@/utils/supabase/serverRedirect";

export default async function MainLayout({ children }) {

  await requireAuth();

  return <div style={{
    height: "100%",
    width: "100%",
    display: "flex",
    gap: 20,
  }}>
    <Container style={{
      padding: 10,
      height: "100%",
      width: 200,
      gap: 20,
    }}>
      <br/>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>I.E.P.O.K</div>
      <br/>
      <br/>
      <br/>
      <DrawerItem>Scheduling</DrawerItem>
      <br/>
      <DrawerItem>Meetings</DrawerItem>
      <br/>
      <DrawerItem>Availability</DrawerItem>
    </Container>
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh" }}>
      {children}
    </div>
  </div>;
}

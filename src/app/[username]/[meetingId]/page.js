"use client";
import Container from "@/components/Container";
import { useParams } from "next/navigation";

export default function BookingPage() {
  const { username, meetingId } = useParams();

  return (
    <Container style={{ padding: 100, borderRadius: 100 }}>
      <Container style={{ padding: 50, borderRadius: 80 }}>
        <Container style={{ padding: 100, borderRadius: 60 }}>
          <Container style={{ padding: 50, borderRadius: 20 }}>
            Not Ready
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

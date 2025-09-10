"use client";
import Container from "@/components/Container";
import { useParams } from "next/navigation";

export default function BookingsPage() {
  const { username } = useParams();

  return (
    <Container style={{ padding: 50 }}>
      <Container style={{ padding: 50 }}>
        <Container style={{ padding: 50 }}>
          <Container style={{ padding: 50 }}>
            Not Ready
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

"use client";
import { useParams } from "next/navigation";

export default function BookingDatePage() {
  const { username, meetingId, dateTime } = useParams();

  return (
    <div>
      <h1>Book Meeting {meetingId} with {username}</h1>
      <form>
        <input type="text" placeholder="Your name" required />
        <input type="email" placeholder="Your email" required />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

"use client";
import { useParams } from "next/navigation";

export default function BookingsPage() {
  const { username } = useParams();

  const meetingTypes = [
    { id: "1", name: "30 min Consultation" },
    { id: "2", name: "1-hour Strategy Call" },
    { id: "3", name: "15-min Quick Chat" },
  ];

  return (
    <div>
      <h1>Book a meeting with {username}</h1>
      <ul>
        {meetingTypes.map(meeting => (
          <li key={meeting.id}>
            <a href={`/${username}/${meeting.id}`}>{meeting.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

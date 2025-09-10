"use client";

import { useState } from "react";
import { updateMeetingType, deleteMeetingType } from "@/utils/supabase/api/set";
import TextField from "@/components/TextField";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { Link as LinkIcon, Type as TypeIcon, Clock as ClockIcon, Trash2 as TrashIcon } from "lucide-react";

export default function MeetingTypeItem({ meetingType, fetchData }) {
  const [name, setName] = useState(meetingType.name);
  const [duration, setDuration] = useState(meetingType.duration);

  const handleUpdate = async (field, value) => {
    try {
      await updateMeetingType(meetingType.id, { [field]: value });
    } catch (err) {
      console.error("Error updating meeting type:", err.message);
    } finally {
      await fetchData();
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this meeting type?")) {
      try {
        await deleteMeetingType(meetingType.id);
      } catch (err) {
        console.error("Error deleting meeting type:", err.message);
      } finally {
        await fetchData();
      }
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        gap: 20,
        borderRadius: 30,
        alignItems: "center",
        padding: "12px 16px",
      }}
    >
      {/* Name Field */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 12, fontWeight: 500, marginBottom: 4, cursor: "none" }}>Meeting Name</label>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleUpdate("name", name)}
          placeholder="Meeting name"
          icon={<TypeIcon size={16} />}
        />
      </div>

      {/* Duration Field */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ fontSize: 12, fontWeight: 500, marginBottom: 4, cursor: "none" }}>Duration</label>
        <TextField
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          onBlur={() => handleUpdate("duration", duration)}
          placeholder="00:30:00"
          icon={<ClockIcon size={16} />}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Delete Button */}
      <Button onClick={handleDelete}>
        <TrashIcon size={16} />
      </Button>

      {/* Copy Link Button */}
      {meetingType.name != "" && <Button
        onClick={() =>
          navigator.clipboard.writeText(
            `${window.location.origin}/${meetingType.user_id}/${meetingType.name}`
          )
        }
      >
        <LinkIcon size={16} style={{ marginRight: 6 }} />
        Copy Link
      </Button>}
    </Container>
  );
}

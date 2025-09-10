'use client'

import { useState } from "react";
import Container from "@/components/Container";
import TextField from "@/components/TextField";
import Button from "@/components/Button";
import { Trash2 } from "lucide-react";
import { deleteAvailability, updateAvailability } from "@/utils/supabase/api/set";

export default function AvailabilityItem({ slot, fetchData }) {
  const [day, setDay] = useState(slot.day);
  const [startTime, setStartTime] = useState(slot.start_time);
  const [endTime, setEndTime] = useState(slot.end_time);

  const handleUpdate = async (field, value) => {
    try {
      await updateAvailability(slot.id, { [field]: value });
      fetchData();
    } catch (err) {
      console.error("Error updating availability:", err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAvailability(slot.id);
      fetchData();
    } catch (err) {
      console.error("Error deleting availability:", err.message);
    }
  };

  return (
    <Container style={{ display: "flex", gap: 10, alignItems: "center", padding: "12px 16px", borderRadius: 30 }}>
      <TextField
        value={day}
        onChange={(e) => setDay(e.target.value)}
        onBlur={() => handleUpdate("day", day)}
        placeholder="Day"
      />
      <TextField
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        onBlur={() => handleUpdate("start_time", startTime)}
        placeholder="Start"
      />
      <TextField
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        onBlur={() => handleUpdate("end_time", endTime)}
        placeholder="End"
      />
      <div style={{ flex: 1 }} />
      <Button onClick={handleDelete}>
        <Trash2 size={16} style={{ marginRight: 6 }} />
        Delete
      </Button>
    </Container>
  );
}

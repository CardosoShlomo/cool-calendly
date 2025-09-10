'use client'

import Button from "@/components/Button";
import { getMeetingTypes } from "@/utils/supabase/api/get";
import { addMeetingType } from "@/utils/supabase/api/set";
import { useEffect, useState } from "react";
import MeetingTypeItem from "./MeetingTypeItem";

export default function SchedulingPage() {
  const [meetingTypes, setMeetingTypes] = useState([]);

  async function fetchData() {
    setMeetingTypes(await getMeetingTypes() || []);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async () => {
    await addMeetingType();
    fetchData();
  }

  return (
    <>
      <br/>
      <br/>
      <br/>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: 20 }}>
        <h1 style={{ margin: 0 }}>Scheduling</h1>
        {meetingTypes.every(e => e.name !== "") && <Button onClick={handleCreate}>
          <span style={{ marginRight: 6 }}>+</span>
          Create
        </Button>}
      </div>
      <div style={{ flex: 1, gap: 20, display: "flex", flexDirection: "column" }}>
        {meetingTypes.map(e => <MeetingTypeItem key={e.id} meetingType={e} fetchData={fetchData} />)}
      </div>
    </>
  );
}

'use client'

import { useEffect, useState } from "react";
import AvailabilityItem from "./AvailabilityItem";
import { getAvailability } from "@/utils/supabase/api/get";

export default function AvailabilityPage() {
  const [availabilityList, setAvailabilityList] = useState([]);

  async function fetchData() {
    const data = await getAvailability() || [];
    setAvailabilityList(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <br/>
      <br/>
      <br/>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: 20 }}>
        <h1 style={{ margin: 0 }}>Availability</h1>
      </div>
      <div style={{ flex: 1, gap: 20, display: "flex", flexDirection: "column" }}>
        {availabilityList.map(e => (
          <AvailabilityItem key={e.id} slot={e} fetchData={fetchData} />
        ))}
      </div>
    </>
  );
}

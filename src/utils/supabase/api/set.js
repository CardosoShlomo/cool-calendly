import { supabase } from "../browser";

export async function addAvailabilitySlot(userId, day, startTime, endTime) {
  const { data, error } = await supabase
    .from("availability")
    .insert([{ user_id: userId, day, start_time: startTime, end_time: endTime }])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function updateAvailability(slotId, updates) {
  const { data, error } = await supabase
    .from("availability")
    .update(updates)
    .eq("id", slotId)
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function deleteAvailability(slotId) {
  const { data, error } = await supabase
    .from("availability")
    .delete()
    .eq("id", slotId);
  
  if (error) throw error;
  return data;
}


export async function addException(userId, type, startTs, endTs) {
  const { data, error } = await supabase
    .from('availability_exception')
    .insert([{ user_id: userId, type, start_ts: startTs, end_ts: endTs }]);
  if (error) throw error;
  return data;
}

export async function bookMeeting(userId, participantName, participantEmail, name, startTs, endTs) {
  const { data, error } = await supabase
    .from('meeting')
    .insert([{
      user_id: userId,
      participant_name: participantName,
      participant_email: participantEmail,
      name,
      start_ts: startTs,
      end_ts: endTs,
      status: 'booked',
    }]);
  if (error) throw error;
  return data;
}

export async function addMeetingType() {
  const {data: { user }} = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('meeting_type')
    .insert([{ user_id: user.id, name: "", duration: "00:30:00" }]);
  if (error) throw error;
  return data;
}

export async function updateMeetingType(id, updates) {
  const { data, error } = await supabase
    .from('meeting_type')
    .update(updates)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}

export async function deleteMeetingType(meetingTypeId) {
  const { data, error } = await supabase
    .from("meeting_type")
    .delete()
    .eq("id", meetingTypeId);

  if (error) throw error;
  return data;
}

import { supabase } from "../browser";

export async function addAvailability(userId, day, startTime, endTime) {
  const { data, error } = await supabase
    .from('availability')
    .insert([{ user_id: userId, day, start_time: startTime, end_time: endTime }]);
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
      status: 'booked'
    }]);
  if (error) throw error;
  return data;
}

export async function addMeetingType(userId, name, duration) {
  const { data, error } = await supabase
    .from('meeting_type')
    .insert([{ user_id: userId, name, duration }]);
  if (error) throw error;
  return data;
}

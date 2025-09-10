import { supabase } from "../browser";

export async function getAvailability(userId) {
  const { data, error } = await supabase
    .from('availability')
    .select('*')
    .eq('user_id', userId)
    .order('day')
    .order('start_time');
  if (error) throw error;
  return data;
}

export async function getExceptions(userId) {
  const { data, error } = await supabase
    .from('availability_exception')
    .select('*')
    .eq('user_id', userId)
    .order('start_ts');
  if (error) throw error;
  return data;
}

export async function getMeetings(userId) {
  const { data, error } = await supabase
    .from('meeting')
    .select('*')
    .eq('user_id', userId)
    .order('start_ts');
  if (error) throw error;
  return data;
}

export async function getMeetingTypes() {
  const { data: { user } } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('meeting_type')
    .select('*')
    .eq('user_id', user.id);
  console.log(error);
  if (error) throw error;
  return data;
}

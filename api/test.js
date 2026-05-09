
import { supabase } from './supabase.js';

export default async function handler(req, res) {
  const { data, error } = await supabase.from('transactions').select('*').limit(1);
  res.status(200).json({ data, error });
}

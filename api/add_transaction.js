import { supabase } from './supabase.js';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Parse JSON body correctly for Vercel
    const body = await req.json();

    const { amount, category, type, date, notes } = body;

    // Insert into the correct table
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ amount, category, type, date, notes }]);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Add transaction error:', err);
    res.status(500).json({ error: err.message });
  }
}

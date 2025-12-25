import { defineEventHandler, readBody } from 'h3';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { text, audioUrl } = body;

  const { data, error } = await supabase
    .from('contacts')
    .insert([{ text, audio_url: audioUrl }]);

  if (error) {
    return {
      statusCode: 500,
      body: { error: error.message },
    };
  }

  return {
    statusCode: 200,
    body: { data },
  };
});
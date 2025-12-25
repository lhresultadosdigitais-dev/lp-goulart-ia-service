import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { name, message, audioUrl } = body;

    const { data, error } = await supabase
        .from('contacts')
        .insert([
            { name, message, audio_url: audioUrl }
        ]);

    if (error) {
        return sendError(event, createError({ statusCode: 500, statusMessage: error.message }));
    }

    return { data };
});
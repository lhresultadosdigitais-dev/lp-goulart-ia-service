import { ref } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function useSupabase() {
  const loading = ref(false);
  const error = ref(null);

  const submitContact = async (textInput, audioUrl) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: insertError } = await supabase
        .from('contacts')
        .insert([{ text: textInput, audio: audioUrl }]);

      if (insertError) throw insertError;

      return data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    submitContact,
  };
}
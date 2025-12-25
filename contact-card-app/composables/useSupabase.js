import { ref } from 'vue';
import { supabase } from '../plugins/supabase.client';

export function useSupabase() {
  const loading = ref(false);
  const error = ref(null);

  const insertContact = async (contactData) => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: insertError } = await supabase
        .from('contacts')
        .insert([contactData]);

      if (insertError) throw insertError;

      return data;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getContacts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('contacts')
        .select('*');

      if (fetchError) throw fetchError;

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
    insertContact,
    getContacts,
  };
}
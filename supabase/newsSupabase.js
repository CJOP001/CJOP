import { supabase } from './supabase';
import 'react-native-url-polyfill/auto';

const newstoSupabase = async (textInputValue) => {
  try {
    const { data, error } = await supabase
      .from('news_management')
      .upsert([
        {
          description: textInputValue,
        },
      ])
      .select('*');

    if (error) {
      console.error('Error sending data to Supabase:', error);
    } else {
      console.log('Data sent to Supabase:', data);
    }
  } catch (error) {
    console.error('Error sending data to Supabase:', error);
  }
};

export { newstoSupabase };

import supabase from '../supabase/supabase';

// Function to get the type based on nc_id from the news_categories table
export async function getTypeForCategoryId(nc_id) {
  try {
    const { data, error } = await supabase
      .from('news_categories')
      .select('type')
      .eq('nc_id', nc_id)
      .single();

    if (error) {
      throw error;
    }

    if (data) {
      console.log('Type data:', data);
      return String(data.type);
    }

    // Return a default value when no rows are found
    return 'Unknown'; // You can replace 'Unknown' with your desired default value
  } catch (error) {
    console.error('Error fetching type from Supabase:', error);
    return 'Error'; // You can replace 'Error' with your desired default value
  }
}

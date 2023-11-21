import supabase from '../supabase/supabase';

// Export the fetchCategories function
export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('news_categories')
      .select('nc_id, type')
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching categories:', error.message);
    } else {
      return data; // Return the fetched categories
    }
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    throw error;
  }
};

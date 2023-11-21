import { getTypeForCategoryId } from '../components/GetType_supabase';
import supabase from '../supabase/supabase';

// Function to fetch data from the Supabase table and format it as JSON
export async function fetchSupabaseData() {
  try {
    const { data, error } = await supabase
      .from('news_management')
      .select('*');

    if (error) {
      throw error;
    }

    if (data) {
      // Map the data and include nc_id
      const articles = await Promise.all(data.map(async (item) => {
        const type = await getTypeForCategoryId(item.nc_id);
        return {
          id: item.id,
          content: item.description,
          timestamp: item.created_at,
          imagePath: item.image_path,
          categoryID: item.nc_id,
          category: String(type), // Include type
        };
      }));
      return articles;
    }

    return [];
  } catch (error) {
    console.error('Error fetching data from Supabase:', error);
    return [];
  }
}

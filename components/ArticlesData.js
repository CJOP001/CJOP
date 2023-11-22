
import supabase from '../supabase/supabase';

// Function to get the type based on nc_id from the news_categories table
export async function getTypeForCategoryId(nc_id) {
  try {
    const { data, error } = await supabase
      .from('news_categories')
      .select('type')
      .eq('id', nc_id)
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

        // Format the timestamp to include day, hours, minutes, seconds, and milliseconds
        const formattedTimestamp = new Date(item.created_at).toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          fractionalSecondDigits: 3, // Include milliseconds
        });

        return {
          id: item.id,
          content: item.description,
          timestamp: formattedTimestamp,
          imagePath: item.image_path,
          categoryID: item.nc_id,
          category: type, // Include type
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

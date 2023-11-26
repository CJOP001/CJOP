// categories.js
import supabase from '../supabase/supabase';

const categories = async () => {
  try {
    const { data, error } = await supabase
      .from('news_categories')
      .select('id, type')
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

export default categories;


/*export const categories = [
  { id: '1', type: 'Corporate' },
  { id: '2', type: 'Health' },
  { id: '3', type: 'Government'},
  { id: '4', type: 'Business'},
  { id: '5', type: 'Opinion'},
  { id: '6', type: 'Food'},
  { id: '7', type: 'Lifestyle'},
  { id: '8', type: 'Charity'},
  { id: '9', type: 'Sports'},
  { id: '10', type: 'SME'},
  { id: '11', type: 'Politics'},
  { id: '12', type: 'Property'},
  { id: '13', type: 'News'},
  { id: '14', type: 'Investment'},
  { id: '15', type: 'Education'},
  { id: '16', type: 'Automotive'},
  { id: '17', type: 'Technology'},
  { id: '18', type: 'Agriculture'},
  { id: '19', type: 'Entertainment'},
  { id: '20', type: 'Travel'},
  ];*/
  
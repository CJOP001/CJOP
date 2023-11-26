 import supabase from "../supabase/supabase";
 import AsyncStorage from "@react-native-async-storage/async-storage";

 export const subscribedArticles = async() => 
 { let user_id;
   var articleArray = [];
   user_id = await AsyncStorage.getItem('uid');

   const {data, error} = await supabase
   .from('subscribe')
   .select('news_id')
   .eq('user_id', user_id);
   if(data)
   {
      for(var i = 0; i < data.length; i++)
      {
         try{
            const {record, error} = await supabase
                                 .from('news_management')
                                 .select('id', 'user_id', 'created_at', 'image_path', 'description', 'likes', 'comments', 'status')
                                 .eq('id', data[i]);

                                 if(record)
                                 {
                                    let result = articleArray.concat(record);
                                    articleArray = result;
                                 }
         }
         catch(e)
         {}
      }
      return articleArray;
   }
   else
   {
      console.log(error);
   }

 }

  export default subscribedArticles;
  
  
  
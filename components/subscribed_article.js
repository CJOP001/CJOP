 import supabase from "../supabase/supabase";
 import React, { useState, useEffect } from "react";
 import AsyncStorage from "@react-native-async-storage/async-storage";

const subscribedArticles = () => 
 { var user_id  = "";
   let newsIDArray = [];
   var articleArray = [];
  
   const getUserID = async() =>{
      console.log(user_id);
      user_id = await AsyncStorage.getItem('uid');
      console.log(user_id);
      getSubscibeArticles(user_id);
     
   }
   const getSubscibeArticles = async(user_id) =>
   {
      let tempData = user_id;
      try{
         const {data, error} = await supabase
                  .from('subscribe')
                  .select('news_id')
                  .eq('user_id', tempData);
                  if(data != "")
                  {
                     console.log(data[0].news_id);

                     console.log(data.length);
                     newsIDArray = data;
                     for(var i = 0; i < newsIDArray.length; i++)
                     {
                        console.log(newsIDArray[i].news_id, "news id");
                       articleArray = await getNewsContent(newsIDArray[i].news_id, articleArray);
                        
                     }
                     console.log(articleArray, "final array");
                     return articleArray;
                  }
                  else
                  {
                     console.log(error, "error in data retrieval");
                  }
      }
      catch(e){
         console.log(e, "Theres error here")
      }
   }
const getNewsContent = async(tempData, articleArray) =>
{
   let tempNews = tempData;
   let tempArray = articleArray;
   try{
      const {data, error} = await supabase
                           .from('news_management')
                           .select('id, user_id, created_at, image_path, description, likes, comments, status')
                           .eq('id', tempNews);
                           console.log(data, "retrieved data");
                           if(data)
                           {
                              //console.log(data);
                              let result = tempArray.concat({
                                 id: data[0].id,
                                 user_id: data[0].user_id,
                                 created_at: data[0].created_at,
                                 image_path: data[0].image_path,
                                 description: data[0].description,
                                 likes: data[0].likes,
                                 comments: data[0].comments,
                                 status: data[0].status});
                              return result;
                           }
   }
   catch(e)
   {}
}
   getUserID();
   

 }

 export default subscribedArticles;

  
  
  
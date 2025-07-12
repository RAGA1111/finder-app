// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

import axios from 'axios'

// const url = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

// const options = {
//   // method: 'GET',
//   // url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
//   params: {
//     bl_latitude: '11.847676',
//     tr_latitude: '12.838442',
//     bl_longitude: '109.095887',
//     tr_longitude: '109.149359',
//     // restaurant_tagcategory_standalone: '10591',
//     // restaurant_tagcategory: '10591',
//     // limit: '30',
//     // currency: 'EUR',
//     // open_now: 'false',
//     // lunit: 'km',
//     // lang: 'en_US'
//   },
//   headers: {
//     'X-RapidAPI-Key': '701c1b1563msh78a642543d1a0afp192892jsnc5a7650b1cad',
//     'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//   }
// };

export const getPlacesData = async(type,sw, ne) =>{
  try{
    const {data:{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        // method: 'GET',
        // url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          // restaurant_tagcategory_standalone: '10591',
          // restaurant_tagcategory: '10591',
          limit: '30',
          currency: 'EUR',
          // open_now: 'false',
          // lunit: 'km',
          // lang: 'en_US'
        },
        headers: {
          'X-RapidAPI-Key': 'ef2d766733msh9c2473c68ec36fep138b99jsn503778e76736',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      }
      
      );
    return data

  } catch(error){
    console.log(`Fetch data Error: ${error}`)
  }

}
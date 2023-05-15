export const geoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e17bfb74f0mshf8ee35a35f5d9b0p13b884jsn58c316a5cafb',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};
export const GEO_API_URL ="https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_API_URL="https://api.openweathermap.org/data/2.5";

export const WEATHER_API_KEY ="36de42cc2cec3848810b0a68f3bb7799";

// import axios from 'axios';

// const geoApiOptions = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': 'e17bfb74f0mshf8ee35a35f5d9b0p13b884jsn58c316a5cafb',
//     'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//   }
// };

// export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";
// export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
// export const WEATHER_API_KEY = "36de42cc2cec3848810b0a68f3bb7799";

// // // Example usage: Fetch data from the Geo API
// axios.get(GEO_API_URL, geoApiOptions)
//   .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// // Example usage: Fetch data from the Weather API
// // axios.get(`${WEATHER_API_URL}/weather`, {
// //   params: {
// //     appid: WEATHER_API_KEY,
// //     q: 'London'
// //   }
// // })
// .then(response => {
//     console.log(response.data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

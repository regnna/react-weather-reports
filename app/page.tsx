"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
// import { ToastAction } from "@/components/ui/toast"
import { Skeleton } from "@/components/ui/skeleton"
// import { Toast } from "@radix-ui/react-toast"
// import { useToast } from "@/components/ui/use-toast"
import { useQuery } from "react-query"
import axios from "axios"
import { QueryClient, QueryClientProvider } from 'react-query';
import { format, fromUnixTime, parseISO } from "date-fns"
import Container from "@/components/container"
import { convertKelvinToCelsius, convertKelvinToCelsius2, getDayOrNightIcon, metertokm, windconv } from "@/lib/utils"
import WeatherIcon from "@/components/WeatherIcon"
import WeatherDetails from "@/components/WeatherDetails"
import ForecastWeatherDetails from "@/components/ForecastWeatherDetails"
import { arrayOutputType } from "zod"
import { useAtom } from "jotai"
import { loadingCityAtom, placeAtom } from "./atom"
import { useEffect } from "react"

interface WeatherDetail {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDetail[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
let deta:WeatherData;

var filteredData:any = {};
var filteredArray:any={}


async function  API(place:string){
  // const [place, setPlace] = useAtom(placeAtom)

  const {data}=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_API_KEY}&cnt=56`)
  // const {data}=await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=pune&appid=b5a3f6ac1b020bd3d54bc6a319d146c2&cnt=56`)
console.log("API data: ",data)
  // deta=data;
  // console.log("API data: ",deta)

  if (data && data.list) {
 filteredData= {};

    data.list.forEach(function(entry:any) {
      var date = new Date(entry.dt * 1000);
      // console.log(date)
      // console.log(entry)
      
      var dateString = date.toISOString().split('T')[0];
      var hour = date.getHours();
  
      // Check if the hour is after 6 AM and if the date is not already in the filteredData
      if (hour >= 6 && !(dateString in filteredData)) {
        filteredData[dateString] = entry;
      }
    });
  }
  
  console.log("FilterData:",filteredData); // This will print the filtered data
  filteredArray = Object.values(filteredData);

  
  return data;
}


function Guga(){
  const [place, setPlace] = useAtom(placeAtom)
const [loadingCity, ] = useAtom(loadingCityAtom)

  const { isLoading, error,data,refetch } = useQuery<WeatherData>({
    queryKey: ['WeatherData'],
    queryFn: async () =>
    {
      if(place=="Republic of India"){
        setPlace("india")
      }
      const data =API(place);
      
    return data;
    }
   
  });
  useEffect(()=>{
 refetch();   
  },[place,refetch])
  // firstDataOutside=data?.list[0];
  filteredArray = Object.values(filteredData);

  // const dailydata=datess(data);

  console.log("data",data)
  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <LoadingSkeleton/>
      {/* <p className="animate-bounce">Loading....</p> */}
    </div>
  )
  

//  console.log(dailydata)
  return ( <div className="mx-10">
    <main className="px-3 max-w-screen-lg mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
      {/* today data */}
      {loadingCity ? <WeatherSkeleton/> :
      <>
      <section className="space-y-4">
        <div className="space-t-4 ">
        <div className="text-center text-4xl">
      {/* <p className="flex gap-1 text-4xl items-end  "> */}
      <p>
            {format(parseISO(data?.list[0]?.dt_txt ?? ' ' ),'EEEE')}
            
            ({format(parseISO(data?.list[0]?.dt_txt ?? ' ' ),'dd.MM.yyyy')})
            </p>
            {/* </p> */}

      </div>
          <Container className="gap-10 px-6 items-center mt-6">
            <div className="flex flex-col px-4">
              <span className="text-5xl">
              {convertKelvinToCelsius(data?.list[0]?.main.temp ?? 296.37)}°C
              </span>
              <p className="text-xs space-x-1 whitespace-nowrap">
                <span>Feels like</span>
                <span>
                {convertKelvinToCelsius2(data?.list[0]?.main.feels_like ?? 296.37)}° C
                </span>

              </p>
              <p className="text-xs space-x-2 ">
                <span>
                {convertKelvinToCelsius2(data?.list[0]?.main.temp_min ?? 0)}°C ↓{" "}
                </span>
                <span>
{" "}                {convertKelvinToCelsius2(data?.list[0]?.main.temp_max ?? 296.37)}°C ↑

                </span>
              </p>
            </div>
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {data?.list.map((d, i) => (
                      <div
                        key={i}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold "
                      >
                        <p className="whitespace-nowrap">
                          {format(parseISO(d.dt_txt), "h:mm a")}
                        </p>
{/* <p>{d.weather[0].icon}</p> */}
                        {/* <WeatherIcon iconName={d.weather[0].icon} /> */}
                        <WeatherIcon
                          iconName={getDayOrNightIcon(
                            d.weather[0].icon,
                            d.dt_txt
                          )}
                        />
                        <p>{convertKelvinToCelsius(d?.main.temp ?? 0)}°</p>
                      </div>
                    ))}
                  </div>
          </Container>
        </div>
        <div className="flex gap-4">
          {/* left */}
          <Container className="w-fit justify-center flex-col px-4 items-center">

            <p className="capitalize text-center">{data?.list[0]?.weather[0].description}</p>
            {/* <WeatherIcon iconName={data?.list[0]?.weather[0].icon} /> */}
            <WeatherIcon
                          iconName={getDayOrNightIcon(
                            data?.list[0]?.weather[0].icon ?? "",
                            data?.list[0]?.dt_txt ?? "",
                          )}
                        />
          </Container>
          <Container className=" px-4 text-black gap-2 justify-around w-full">
<WeatherDetails visability={metertokm(data?.list[0]?.visibility ?? 1000)} 
airPressure={`${data?.list[0]?.main.pressure}hPa`}
windSpeed={windconv(data?.list[0]?.wind.speed ?? 5) }
// sunrise={`${data?.city.sunrise ?? "6:00"}`}
sunrise={format(
  fromUnixTime(data?.city.sunrise ?? 1702949452),"H:mm"
)}
sunset={format(
  fromUnixTime(data?.city.sunset ?? 1702517657),"H:mm"
)}
// {`${data?.city.sunset ?? "6:00"}`}
humidity={`${data?.list[0].main.humidity ?? 99 }%`}
/>

          </Container>
          {/* right */}

        </div>
      </section>
      {/* 7 days forcast data  */}
     <section className="flex w-full flex-col gap-4">
      <div className="text-center">
      <p className="text-4xl  ">Forcast (7 days)</p>

      </div>



      {filteredArray.map((d:any,i:any)=>(
      <ForecastWeatherDetails 
      key={i}
      description={d?.weather[0].description ?? ""}
      weathrIcon={d?.weather[0].icon ?? "01d"}
      date={format(parseISO(d?.dt_txt ?? ""), "dd.MM")}
      day={format(parseISO(d?.dt_txt ?? ""), "EEEE")}
      feels_like={d?.main.feels_like ?? 0}
      temp={d?.main.temp ?? 0}
      temp_max={d?.main.temp_max ?? 0}
      temp_min={d?.main.temp_min ?? 0}
      airPressure={`${d?.main.pressure} hPa `}
      humidity={`${d?.main.humidity}% `}
      sunrise={format(
        fromUnixTime(data?.city.sunrise ?? 1702517657),
        "H:mm"
      )}
      sunset={format(
        fromUnixTime(data?.city.sunset ?? 1702517657),
        "H:mm"
      )}
      visability={`${metertokm(d?.visibility ?? 10000)} `}
      windSpeed={`${windconv(d?.wind.speed ?? 1.64)} `}
      
      />

      ))}

     </section>
     </>}
    </main>
              

    {/* {data.cod} */}
  </div>
  
)}

export default function IndexPage() {

  const queryClient = new QueryClient();

  return (
    <section className="container grid items-center">
      <div className="flex w-screen flex-col items-start gap-2">
       
        <QueryClientProvider client={queryClient}>
          
      <Guga/>
    </QueryClientProvider>
   
      </div>
    </section>
  )
}


// export default IndexPage;
function WeatherSkeleton() {
  return (
    <div className="mx-10">
    <main className="px-3 max-w-screen-lg mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
    <section className="space-y-8 ">
      {/* Today's data skeleton */}
      <div className="space-y-2 animate-pulse">
        {/* Date skeleton */}
        <div className="flex gap-1 text-2xl items-end ">
          <div className="h-6 w-24 bg-accent rounded"></div>
          <div className="h-6 w-24 bg-accent rounded"></div>
        </div>

        {/* Time wise temperature skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="h-6 w-16 bg-accent rounded"></div>
              <div className="h-6 w-6 bg-accent rounded-full"></div>
              <div className="h-6 w-16 bg-accent rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 7 days forecast skeleton */}
      <div className="flex flex-col gap-4 animate-pulse">
        <p className="text-2xl h-8 w-36 bg-accent rounded"></p>

        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            <div className="h-8 w-28 bg-accent rounded"></div>
            <div className="h-10 w-10 bg-accent rounded-full"></div>
            <div className="h-8 w-28 bg-accent rounded"></div>
            <div className="h-8 w-28 bg-accent rounded"></div>
          </div>
        ))}
      </div>
    </section>
    </main>
    </div>
  );
}


const HourlyForecastSkeleton = () => (
  <section className="skeleton-hourly-forecast animate-pulse">
    {[...Array(24)].map((_, i) => (
      <div key={i} className="skeleton-hourly-item"></div>
    ))}
  </section>
);

// Skeleton for the 7-day forecast
const SevenDayForecastSkeleton = () => (
  <div className="skeleton-7day-forecast">
    {[...Array(7)].map((_, i) => (
      <div key={i} className="skeleton-7day-item"></div>
    ))}
  </div>
);

// Main loading skeleton that includes all the individual skeletons
const LoadingSkeleton = () => (
  <div className="skeleton-container">
    <WeatherSkeleton />
    <HourlyForecastSkeleton />
    <SevenDayForecastSkeleton />
  </div>
);


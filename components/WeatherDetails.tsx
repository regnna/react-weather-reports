import { LucideDroplet, LucideDroplets, LucideEye, LucideGauge, LucideSunrise, LucideSunset, LucideWind } from 'lucide-react'
import React from 'react'

export interface WeatherDetailProps {
    visability: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
  }

const WeatherDetails = (props: WeatherDetailProps) => {

    const {
        visability = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6.20",
        sunset = "18:48"
      } = props;

  return (
    <>
    <SingleWeatherDetail 
    icon={<LucideEye/>}
    information='Visibility'
    value={props.visability}
    />
    <SingleWeatherDetail 
    icon={<LucideDroplets/>}
    information='Humidity'
    value={props.humidity}
    />
    <SingleWeatherDetail 
    icon={<LucideWind/>}
    information='Wind Speed'
    value={props.windSpeed}
    />
   
    <SingleWeatherDetail 
    icon={<LucideGauge/>}
    information='Air Pressure'
    value={props.airPressure}
    />
    <SingleWeatherDetail 
    icon={<LucideSunrise/>}
    information='Sunrise'
    value={props.sunrise}
    />
    <SingleWeatherDetail 
    icon={<LucideSunset/>}
    information='Sunset'
    value={props.sunset}
    />

    </>
  )
}

export default WeatherDetails



export interface SingleWeatherDetailProps{
    information: string;
    icon: React.ReactNode;
    value: string;

}

function SingleWeatherDetail(props:SingleWeatherDetailProps){
    return (
        <div className='flex flex-col justify-around gap-3 items-center text-xs font-semibold text-foreground/80'>
            
            <p className='whitespace-nowrap'>
                {props.information}
            </p>
<div className='text-4xl'>{props.icon}</div>
<p>{props.value}</p>
        </div>
    )
}

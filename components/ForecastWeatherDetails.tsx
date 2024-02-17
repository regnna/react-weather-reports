import React from 'react'
import Container from './container'
import WeatherIcon from './WeatherIcon'
import WeatherDetails, { WeatherDetailProps } from './WeatherDetails';
import { convertKelvinToCelsius } from '@/lib/utils';

type Props = {}

export interface ForecastWeatherDetailProps extends WeatherDetailProps {
    weathrIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
  }

const ForecastWeatherDetails = (props: ForecastWeatherDetailProps) => {
    const {
        weathrIcon = "02d",
        date = "19.09",
        day = "Tuesday",
        temp,
        feels_like,
        temp_min,
        temp_max,
        description
      } = props;
  return (
    <Container className='lg:gap-4 md:gap-1 sm:gap-1'>
        {/* left section*/}
        <section className='flex lg:gap-4 md:gap-2 sm:gap-1 items-center px-4'>
<div className='flex flex-col gap-1 items-center'>
    <WeatherIcon iconName={weathrIcon}/>
    <p>{date}</p>
    <p className='text-sm'>{day}</p>
</div>

<div className='flex flex-col lg:px-4 sm:px-2'>
    <span className='lg:text-5xl md:text-3xl sm:text-3xl'>
{convertKelvinToCelsius(temp ?? 0)}°
    </span>
    <p className='text-xs space-x-1 whitespace-nowrap'>
        <span>
            Feels like
        </span>
        <span>
            {convertKelvinToCelsius(feels_like ?? 0)}°
        </span>
    </p>
    <p className='capitalize'>{description}</p>
</div>
</section>
{/* right section*/}
<section className='lg:overflow-x-auto md:overflow-x-auto sm:overflow-x-scroll flex justify-between lg:gap-4 sm:gap-1  lg:px-4 sm:px-1 w-full lg:pr-10 md:pr-9 sm:pr-7'>
<WeatherDetails {...props}/>
</section>
    </Container>
  )
}

export default ForecastWeatherDetails
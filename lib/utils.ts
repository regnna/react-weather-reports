import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertKelvinToCelsius(tempInKelvin: number): number {
  const tempInCelsius = tempInKelvin - 273.15;
  return Math.floor(tempInCelsius); // Removes decimal part and keeps integer part
}

export function convertKelvinToCelsius2(tempInKelvin: number): number {
  const tempInCelsius = tempInKelvin - 273.15;
  return Math.floor(tempInCelsius*10)/10; // Removes decimal part and keeps integer part
}


export function getDayOrNightIcon(
  iconName: string,
  dateTimeString: string
): string {
  const hours = new Date(dateTimeString).getHours(); // Get hours from the given date and time string

  const isDayTime = hours >= 6 && hours < 18; // Consider daytime from 6 AM to 6 PM

  return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n");
}

export function metertokm(m: number): string{
const km=m/1000;
return `${km.toFixed(0)}Km`
}

export function windconv(mps:number):string{
  const kph=mps*3.6;
  return `${kph.toFixed(0)}km/h`;
}
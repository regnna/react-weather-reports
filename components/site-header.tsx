"use client"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import SearchBox from "./SearchBox"
import { useState } from "react"
import axios from "axios"
import { loadingCityAtom, placeAtom } from "@/app/atom"
import { useAtom } from "jotai"
import { LocateFixed } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export function SiteHeader() {

  const [city,setCity]=useState("");
  const [error,setError]=useState("");

  const [suggestions,setSuggestions]=useState<string[]>([]);
  const [showSuggestions,setShowSuggestions]=useState(false);
const [place, setPlace] = useAtom(placeAtom)
const [_,setLoadingCity ] = useAtom(loadingCityAtom)


function handleCurrentLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( async(position)=>{
      const {latitude,longitude}=position.coords;
      try{
        setLoadingCity(true);
        const response=await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
        setTimeout(()=>{
          setLoadingCity(false);
          // setPlace()
          // console.log("Placce",response.data.name)
          setPlace(response.data.name);
        },500);
      }
      catch(error){
  setLoadingCity(false);
      }
    } )
  }
  }
  async function handleInputChange(value:string){
    setCity(value);
    if(value.length>=3){
      try{
        const response =await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
        const suggestions=response.data.list.map((items:any)=>items.name);
        setSuggestions(suggestions);
        setError('')
        setShowSuggestions(true);
      }
      catch(error){
        setSuggestions([])
        setShowSuggestions(false);
      }
    }
    else{
      setSuggestions([])
        setShowSuggestions(false);
    }
  }
  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmiSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
        // setShowSuggestions(false);

      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }
  return (
    <header className=" bg-background sticky top-0  z-40 w-full border-b align-middle ">
      <div className="grid grid-flow-col justify-stretch
      mb-{6} h-16 sm:justify-between sm:space-x-0  ">
<div className="mt-4 mx-6">
        <MainNav items={siteConfig.mainNav}  />
</div>
        {/* <div></div> */}
        <div className="flex flex-1 mt-4 mx-6 justify-center space-x-2 align-top">
          <div className="relative hidden md:flex">
  <SearchBox
  value={city}
  onSubmit={handleSubmiSearch}
  onChange={(e)=>handleInputChange(e.target.value)}
  />
  
  <SuggetionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error
            }}
          />
  </div>
 
  {/* searchBox */}
</div>

        <div className="flex flex-1 mt-4 mx-6 gap-5 justify-center space-x-2 align-top " >
        <div className="flex items-center justify-center h-5 w-5 mt-3 mr-3">
        <LocateFixed
              title="Your Current Location"
              onClick={handleCurrentLocation}
              className=" cursor-pointer"
            />
        {/* <Link
        title="Your current Location"
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
            <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",

                })}
              >
                <Icons.gps className="h-5 w-5 fill-current" />
                <span className="sr-only">Location</span>
              </div>
            </Link> */}
            </div>
        {/* <div className="flex items-center justify-center h-5 w-5 mt-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-locate-fixed"><line x1="2" x2="5" y1="12" y2="12"/><line x1="19" x2="22" y1="12" y2="12"/><line x1="12" x2="12" y1="2" y2="5"/><line x1="12" x2="12" y1="19" y2="22"/><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="3"/></svg>
        </div> */}
        <div className="flex items-center justify-center h-5 w-5 mt-3">
        <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
            <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",

                })}
              >
                <Icons.location className="h-5 w-5 fill-current" />
                <span className="sr-only">Location</span>
              </div>
            </Link>
        
  <p className=" flex text-foreground capitalize ">{place}</p>
</div>
          {/* <div></div> */}
          {/* <nav className="flex items-center space-x-1"> */}

               
           


            <div>
              
            </div>
        {/* </div> */}
{/* <div></div> */}
<div className=" right-0 mr-9"><ThemeToggle /></div>
</div>
          {/* </nav> */}
      </div>
    </header>
  )
}


function SuggetionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-background absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-accent"
            >
              {item}
            </li>
          ))}
        </ul>
       )}  
    </>
  );
}
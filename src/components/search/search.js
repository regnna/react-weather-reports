import {useState} from "react";
import { GEO_API_URL,geoApiOptions} from "../../api";
import {AsyncPaginate} from "react-select-async-paginate";

const Search = ({onSearchChange}) => {
    const [search,setSearch]=useState(null)        //useState hooks
    const loadOptions=(inputValue)=>{
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
        .then((response )=> response.json())
        .then((response) => {
            return{
                options: response.data.map((city)=>
                {
                    return{
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        })
        .catch(err => console.error(err));

    };
    const handleOnChange=(searchData)=>{
        setSearch(searchData);
        onSearchChange(searchData);
    };
    return (  
        <AsyncPaginate
            placeholder="SEARCH FOR THE CITY"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange} //in onChange method we want to update the value and we want to emmit that to the app.js
            loadOptions={loadOptions}
        />
    )
}
export default Search;

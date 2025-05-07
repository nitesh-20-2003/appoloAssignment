import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { CityCombobox } from "./Loc";
const SearchLocation = () => {
  return (
    <div className="flex items-center mb-5">
      <CiLocationOn className="h-10 w-10 mt-4" />
      <div className="flex flex-col items-center">
        <span className=" bolder text-gray-500"> Select Location</span>
        <CityCombobox />
      </div>
     
    </div>
  );
}

export default SearchLocation
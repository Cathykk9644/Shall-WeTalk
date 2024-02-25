import React from "react";
import { FaSearch } from "react-icons/fa";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { IoFilter } from "react-icons/io5";

const FriendsTopBar = ({searchValue,setSearchValue}) => {
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div >
      {/* Top bar */}
      <div className="flex justify-center items-center p-2 border-b ">
        <div className="flex items-center -ml-2">
          <img
            src="https://images.unsplash.com/photo-1600807497639-3b5d8e74a232?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGhpa2luZ3xlbnwwfHwwfHx8MA%3D%3D"
            alt="dummy user image"
            className="w-8 h-8 rounded-full object-cover "
          />
          <span className="font-semibold text-sm text-gray-500 ml-2">
            {"You"}
          </span>
          {/* Search bar */}
          <div className="relative ml-4 flex-1 ">
            <FaSearch
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 "
              size={10}
            />
            <input
              type="text"
              value= {searchValue}
              placeholder="Search friends..."
              onChange={handleInputChange}
              className="pl-8 pr-4 py-1 w-full border rounded-full focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs"
            />
          </div>
          {/* Filter button */}
          <button className="ml-4 p-2 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none">
            <IoFilter />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default FriendsTopBar;

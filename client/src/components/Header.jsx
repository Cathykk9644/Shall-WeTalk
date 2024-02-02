import React from "react";
import LOGO from "../Assets/Logo.jpeg";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
  return (
    <div className="w-screen z-50 px-14 py-8">
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center">
          <img src={LOGO} alt="logo" className="w-44 object-cover" />
        </div>
        <ul className="flex items-center gap-12">
          <li className="text-md font-semibold text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
            Home
          </li>
          <li className="flex items-center text-md font-semibold text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
            How it works <RiArrowDropDownLine className="text-2xl" />
          </li>
          <li className="text-md font-semibold text-textColor1 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
            About
          </li>
        </ul>
        <div className="flex items-center">
          <button className="text-md font-semibold text-textColor1 hover:text-headingColor duration-100 transition-all cursor-pointer ease-in-out mr-4">
            Login
          </button>
          <button className="bg-buttonColor hover:bg-buttonHoverColor text-white text-md font-semibold py-2 px-6 rounded-xl duration-100 transition-all ease-in-out hover:scale-90 hover:bg-headingColor ">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import Header from "./Header";
import Banner from "./Banner";

const HomeContainer = () => {
  return (
    <div className="relative w-screen h-screen bg-bgColor1">
      <div className="absolute top-0 left-0 w-full h-full">
        <Header />
        <Banner />
      </div>
    </div>
  );
};

export default HomeContainer;

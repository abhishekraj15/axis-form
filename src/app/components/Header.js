import React from "react";

const Header = () => {
  return (
    <>
      <div className="w-full flex items-center justify-between rounded-lg border bg-white">
        <h2 className="text-md sm:text-lg md:text-2xl ml-4 font-bold">
          <span className="text-[#97144D] font-semibold">Axis</span> Bank
          Priority Banking
          <br /> Programme
        </h2>
        <div className="">
          <img src="/logo.png" />
        </div>
      </div>
    </>
  );
};

export default Header;

import React from "react";

const Expert = () => {
  return (
    <div className="bg-white h-screen flex justify-center items-center w-full">
      <div className="w-5/6 h-5/6 border border-black">
        <div className="grid grid-cols-2 h-full">
          <div className="w-full h-full border border-red-600"></div>

          {/* Wrap the next two divs inside a parent container */}
          <div className="flex flex-col">
            <div className="w-full h-1/2 border border-red-600"></div>
            <div className="w-full h-1/2 border border-red-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;

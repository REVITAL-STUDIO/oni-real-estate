import React from "react";

const Schedule = () => {
  return (
    <div className="bg-storm w-full h-screen">
      <div className="w-full h-full bg-gradient-to-t from-pine via-mint to-storm flex flex-col justify-center items-center">
        <div className="flex text-black h-2/4 w-full justify-evenly flex-col items-center">
          <p className="text-5xl font-medium text-center w-3/4">
            Your situation requires a delicate touch. As your Trusted Real
            Estate Professionals, we will recognize and respond to the meeting
            request promptly.
          </p>
          <button className=" bg-forest shadow-lg shadow-black hover:shadow-gray-100 transition ease-in-out duration-300 mt-4 rounded-xl w-1/6 h-14">
            <span className="text-white">Schedule Consultation</span>
          </button>
        </div>
        <div className="w-full h-1/6 "></div>
      </div>
    </div>
  );
};

export default Schedule;

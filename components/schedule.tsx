import React from "react";

const Schedule = () => {
  return (
    <div className="bg-storm w-full h-screen">
      <div className="w-full h-full bg-gradient-to-t from-mint flex flex-col">
        <div className="w-full h-full ">
          <div className="flex text-black h-5/6 w-full justify-evenly flex-col items-center">
            <p className="">
              Your situation requires a delicate touch. As your Trusted Real
              Estate Professionals, we will recognize and respond to the meeting
              request promptly.
            </p>
            <button className="border border-black rounded-xl w-1/6 h-14">
              <span>Schedule Consultation</span>
            </button>
          </div>
          <div className="w-full h-1/6 "></div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

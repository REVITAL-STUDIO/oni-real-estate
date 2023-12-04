import React from "react";

const Contact = () => {
  return (
    <div className="h-400 w-full bg-[url('/contact.png')] bg-cover flex">
      <div className="flex flex-col w-1/2 h-full justify-center">
        <h2 className="text-white text-2xl relative top-6  font-medium p-4 tracking-wide">
          STAY UPDATED. BE THE FIRST TO KNOW.
        </h2>
        <form className="flex flex-col h-full items-center justify-center rounded-lg m-4 ">
          <input
            className="bg-transparent mb-2 p-2 w-2/3 border-b-2 border-white text-white font-medium text-md px-1 outline-none"
            type="text"
            placeholder="NAME"
          />
          <input
            className="bg-transparent mb-2 p-2 w-2/3 border-b-2 border-white text-white font-medium text-md px-1 outline-none"
            type="text"
            placeholder="PHONE"
          />
          <input
            className="bg-transparent mb-2 p-2 w-2/3 border-b-2 border-white text-white font-medium text-md px-1 outline-none"
            type="text"
            placeholder="EMAIL"
          />
          <div className="w-2/3">
            <input
              className="text-white text-md mt-8 shadow-lg shadow-black tracking-wide bg-royal/50 w-32 h-12 rounded-sm"
              type="submit"
              value="SUBMIT"
            />
          </div>
        </form>
      </div>
      <div className="flex flex-col w-1/2 h-full">
        <h2 className="text-white text-2xl relative top-6 font-medium p-4 tracking-wide">
          WORK WITH US.
        </h2>
        <div className="flex flex-col h-3/4 justify-center rounded-lg m-4">
          <p className="text-white text-sm px-12">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. empor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. empor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam"
          </p>
          <button className="text-white text-md mt-8 shadow-lg shadow-black tracking-wide bg-royal/50 w-32 h-12 rounded-sm relative left-12">
            <span className="text-white">JOIN ONI</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

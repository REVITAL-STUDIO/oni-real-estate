import React from "react";

const Contact = () => {
  return (
    <div className="h-300 w-full bg-[url('/contact.png')] bg-cover flex">
      <form className="w-1/2 flex flex-col h-full rounded-lg flex justify-center items-center ">
        <input
          className="bg-transparent mb-4 p-2 w-2/3 border-b-2 border-white text-white font-medium text-md px-1 outline-none"
          type="text"
          placeholder="NAME"
        />
        <input
          className="bg-transparent mb-4 p-2 w-2/3 border-b-2 border-white text-white font-medium text-md px-1 outline-none"
          type="text"
          placeholder="PHONE"
        />
        <input
          className="bg-transparent mb-4 p-2 w-2/3 border-b-2 border-white text-white font-medium text-md px-1 outline-none"
          type="text"
          placeholder="EMAIL"
        />
        <input
          className="text-white mt-4 bg-royal w-32 h-12 rounded-xl"
          type="submit"
          placeholder="EMAIL"
        />
      </form>
      <div className="w-1/2 h-full"></div>
    </div>
  );
};

export default Contact;

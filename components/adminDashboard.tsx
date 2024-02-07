import React from "react";

const AdminDashboard = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[90%] h-5/6 bg-mist/20 shadow-lg rounded-2xl grid grid-cols-2 grid-rows-2">
        <div className=" col-span-1 row-span-1 bg-mint rounded-tl-2xl flex justify-center items-center">
          <div className="w-2/5 h-[90%] bg-white rounded-2xl"></div>
        </div>
        <div className="bg-pine col-span-1 row-span-1 rounded-tr-2xl">
          <div className="w-full h-1/2 flex justify-evenly items-center">
            <div className="w-2/5 h-32 bg-white rounded-3xl shadow-lg"></div>
            <div className="w-2/5 h-32 bg-white rounded-3xl shadow-lg"></div>
          </div>
        </div>
        <div className="bg-forest col-span-2 rounded-br-2xl rounded-bl-2xl"></div>
      </div>
    </div>
  );
};

export default AdminDashboard;

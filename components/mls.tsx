import React from "react";
import Image from "next/image";
import Link from "next/link";
import home1 from "public/home1.jpeg";
import home2 from "public/home2.jpeg";
import home3 from "public/home3.jpeg";
import home4 from "public/home4.jpeg";
import home5 from "public/home5.jpeg";
import home6 from "public/home6.jpeg";

const homes = [home1, home2, home3, home4, home5, home6];

const Mls = () => {
  return (
    <div className="w-full h-3/4 bg-royal/50 flex">
      {/* MLS Housing */}
      <div className="w-1/2 h-full ">
        <div className="w-1/2 h-1/2 border m-2 bg-white flex flex-col">
          {homes.map((homesFile, index) => (
            <div
              className="w-full h-2/3 border"
              key={index}
              style={{
                backgroundImage: `url(${homesFile})`,
                backgroundSize: "cover",
              }}
            ></div>
          ))}
        </div>
      </div>
      {/* Google Api */}
      <div className="w-1/2 h-full"></div>
    </div>
  );
};

export default Mls;

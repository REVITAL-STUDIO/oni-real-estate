import React from "react";
import Image from "next/image";
import seller from "public/seller.png";

const Seller = () => {
  return (
    <div className="w-full h-full flex bg-storm ">
      {/* Info */}
      <div className="w-1/2"></div>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h2 className="uppercase text-6xl font-medium bg-gradient-to-r from-black via-mint to-mint bg-clip-text text-transparent">
          Seller Process
        </h2>
        <div className=" w-3/4 h-11/12">
          <Image
            src={seller}
            alt="seller"
            className="w-[100%] h-[100%] shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Seller;

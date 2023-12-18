import React from "react";
import Image from "next/image";
import seller from "public/seller.png";

const Seller = () => {
  return (
    <div className="w-full h-5/6 bg-black flex">
      {/* Info */}
      <div className="w-1/3 h-full  flex justify-center items-center">
        <div className="w-3/4 h-full ">
          <ul className="w-full h-3/4 text-md text-white flex gap-y-6 justify-center items-center flex-col">
            <li>Select a Real Estate Agent</li>
            <li>Obtain Financial Pre-approval</li>
            <li>Analyze needs with Buyer Consultation</li>
          </ul>
        </div>
      </div>
      {/* Seller Process */}
      <div className="w-3/5 h-full flex justify-center items-center">
        <div className="w-[90%] h-3/4 text-right flex flex-col">
          <h2 className="uppercase font-medium w-full text-6xl z-10 tracking-wider bg-gradient-to-r from-white via-rgba-white-opacity to-blue-600 bg-clip-text text-transparent">
            Seller Process
          </h2>
          <div className="w-full h-56 flex justify-center">
            <Image src={seller} alt="buy"></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;

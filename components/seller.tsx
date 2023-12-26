import React from "react";
import Image from "next/image";
import seller from "public/seller.png";

const Seller = () => {
  return (
    <div className="w-full h-full flex bg-storm ">
      {/* Info */}
      <div className="w-1/2"></div>
      <div className="w-1/2 flex justify-center items-center">
        <div className=" w-3/4 h-11/12">
          <Image src={seller} alt="seller" className="w-[100%] h-[100%]" />
        </div>
      </div>
    </div>
  );
};

export default Seller;

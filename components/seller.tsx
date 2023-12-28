import React from "react";
import Image from "next/image";
import seller from "public/seller.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faLock,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const Seller = () => {
  return (
    <div className="w-full h-full flex bg-storm ">
      {/* Info */}
      <div className="w-1/2 bg-gradient-to-t from-storm via-mint to-storm flex justify-center items-center">
        <div className="w-5/6 h-3/5  ">
          {/* icon cards */}
          <div className="w-full h-full flex justify-center items-center relative">
            <div className="w-36 bg-white h-36 rounded-full absolute bottom-0 right-0 drop-shadow-lg flex justify-center border border-pine items-center">
              <FontAwesomeIcon
                icon={faLock}
                size="sm"
                className="w-16 h-16 text-pine"
              />
            </div>
            <div className="w-36 bg-white h-36 rounded-full absolute top-0 drop-shadow-lg flex justify-center border border-pine items-center">
              <FontAwesomeIcon
                icon={faHandshake}
                size="sm"
                className="w-16 h-16 text-pine"
              />
            </div>
            <div className="w-36 bg-white h-36 rounded-full absolute bottom-0 left-0 drop-shadow-lg flex justify-center border border-pine items-center">
              <FontAwesomeIcon
                icon={faLayerGroup}
                size="sm"
                className="w-16 h-16 text-pine"
              />
            </div>
          </div>
        </div>
      </div>
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

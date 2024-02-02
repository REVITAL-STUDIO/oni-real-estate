import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faHeadset } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "@/components/dashboard";

const page = () => {
  return (
    <div>
      <div className="w-full h-[10%]"></div>
      <Dashboard />
    </div>
  );
};

export default page;

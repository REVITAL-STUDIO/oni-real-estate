import React, { useState } from "react";

import Homes from "./homes";
import Google from "./google";

const Mls = ({}) => {
  return (
    <div className="w-full h-full bg-pine flex">
      <Homes />
      <Google />
    </div>
  );
};

export default Mls;

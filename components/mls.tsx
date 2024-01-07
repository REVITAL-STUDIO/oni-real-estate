import React, { useState } from "react";

import Homes from "./homes";
import Google from "./google";

const Mls = ({}) => {
  return (
    <div className="w-full h-2000 ">
      <Google />
      <Homes />
    </div>
  );
};

export default Mls;

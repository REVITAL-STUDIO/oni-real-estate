import React, { useState } from "react";

import Homes from "./homes";
import Google from "./google";

const Mls = ({}) => {
  return (
    <div className="w-full h-3/4 bg-royal/50 flex">
      <Homes />
      <Google />
    </div>
  );
};

export default Mls;

import React, { useState } from "react";

import { HomeView } from "../components";

export const HomeContainer = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <HomeView value={value} handleChange={handleChange} />;
};

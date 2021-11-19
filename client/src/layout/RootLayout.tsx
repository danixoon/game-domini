import { useFetchPlayer } from "@generated";

import React from "react";

const RootLayout: React.FC<{}> = (props) => {
  const player = useFetchPlayer({ id: "ok" });

  return <div>{}</div>;
};

export default RootLayout;

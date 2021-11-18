import { useFetchUser } from "@generated";

import React from "react";

const RootLayout: React.FC<{}> = (props) => {
  const user = useFetchUser({ id: "12" });

  // const name = ?.username;

  return <div>{}</div>;
};

export default RootLayout;

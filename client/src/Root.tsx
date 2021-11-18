// import { ApiProvider } from "providers/ApiProvider";
import * as React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";

import "./styles/default.css";

export type RootContainerProps = {};

const queryClient = new QueryClient();

const Root: React.FC<RootContainerProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ApiProvider> */}
      <Router>
        <RootLayout />
      </Router>
      {/* </ApiProvider> */}
    </QueryClientProvider>
  );
};

export default Root;

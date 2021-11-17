import { ApiProvider } from "providers/ApiProvider";
import * as React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";

import "./styles/default.css";

export type RootContainerProps = {};

const queryCache = new QueryCache();

const Root: React.FC<RootContainerProps> = (props) => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ApiProvider>
        <Router>
          <RootLayout />
        </Router>
      </ApiProvider>
    </ReactQueryCacheProvider>
  );
};

export default Root;

import * as React from "react";
import * as ReactDOM from "react-dom";
import Root from "./Root";
import { gql } from "@apollo/client";

const rootElement = document.getElementById("app-root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.render(<Root />, rootElement);

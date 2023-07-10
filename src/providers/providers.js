"use client";
import { Provider } from "jotai";

export default function JotaiProvider({ children }) {
  return <Provider>{children}</Provider>;
}

// create a client provider here to wrap the children in root
// does it need to be a client comp?

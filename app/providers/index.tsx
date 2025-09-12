import React, { ReactNode } from "react";
import ThemeProvider from "./theme/ThemeProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;

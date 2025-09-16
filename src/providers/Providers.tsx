import React, { ReactNode } from "react";
import ThemeProvider from "./theme/ThemeProvider";
import AuthProvider from "./auth/AuthProvider";
import ReactQuery from "./reactQuery/ReactQuery";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQuery>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </ReactQuery>
  );
};

export default Providers;

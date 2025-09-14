import React, { ReactNode } from "react";
import ThemeProvider from "./theme/ThemeProvider";
import AuthProvider from "./auth/AuthProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;

import { AuthContext } from "@widgets/providers/auth/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default useAuth;

import { useContext } from "react";
import { AuthContext } from "app/providers/auth/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export default useAuth;

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "../../../FirebaseConfig";
import { useRouter } from "expo-router";

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const checkUser = () => {
    try {
      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          router.replace("/(tabs)/home");
        } else {
          router.replace("/(auth)");
        }
      });
    } catch (error) {
      console.log("Error:", error);
      alert("Error:" + error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      if (data) {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      const e = error as Error;
      console.log(e.message);
      alert("Failed:" + e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = checkUser();

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

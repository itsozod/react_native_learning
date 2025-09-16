import { createContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../../../FirebaseConfig";
import { router } from "expo-router";
type AuthContextType = {
  user: User | null;
  signIn: ({ email, password }: SignIn) => Promise<void>;
  logOut: () => void;
  initializing: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  logOut: async () => {},
  initializing: true,
});

interface SignIn {
  email: string;
  password: string;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  const signIn = async ({ email, password }: SignIn) => {
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

  const logOut = () => {
    signOut(auth);
    setUser(null);
    router.replace("/(auth)");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, initializing, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

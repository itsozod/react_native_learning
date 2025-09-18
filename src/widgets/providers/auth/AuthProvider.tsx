import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../../../../FirebaseConfig";
import { router } from "expo-router";
import { Alert } from "react-native";

type AuthContextType = {
  user: User | null;
  signIn: ({ email, password }: SignIn) => Promise<void>;
  signUp: ({ email, password }: SignIn) => Promise<void>;
  logOut: () => void;
  initializing: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
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
      Alert.alert("Failed:" + e.message);
    }
  };
  const signUp = async ({ email, password }: SignIn) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("User created successfully");
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
    <AuthContext.Provider
      value={{ user, signIn, signUp, initializing, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

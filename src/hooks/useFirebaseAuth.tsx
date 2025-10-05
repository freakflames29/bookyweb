import React from "react";
import { auth, provider } from "../firebase/firebaseConf";
import { signInWithPopup, signOut, type User } from "firebase/auth";
import { useAppSelector } from "../redux/useAppSelector";

const useFirebaseAuth = () => {
  const [loading, setLoading] = React.useState(false);
  // const [user, setUser] = React.useState<User | null>(null);


  // const user = useAppSelector((state) => state.userReducer.user);
  // console.log("user", user);

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;

      return signedInUser;
    } catch (error) {
      console.log("Error came", error);
      console.error("Error during sign-in", error);
    } finally {
      setLoading(false);
    }
  };

  const googleSignOut = async () => {
    try {
      await signOut(auth);
      // setUser(null);
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  };

  // Automatically track auth state changes
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      // setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { loading, googleSignIn, googleSignOut };
};

export default useFirebaseAuth;

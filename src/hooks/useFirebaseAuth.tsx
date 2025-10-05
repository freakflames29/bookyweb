import React from "react";
import { auth, provider } from "../firebase/firebaseConf";
import { signInWithPopup, signOut,type User } from "firebase/auth";

const useFirebaseAuth = () => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);

  const googleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const signedInUser = result.user;
    //   setUser(signedInUser);
      console.log("Signed in user", signedInUser);
      return signedInUser;
    } catch (error) {
        console.log("Error came",error)
      console.error("Error during sign-in", error);
    } finally {
      setLoading(false);
    }
  };

  const googleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error during sign-out", error);
    }
  };

  // Automatically track auth state changes
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, loading, googleSignIn, googleSignOut };
};

export default useFirebaseAuth;

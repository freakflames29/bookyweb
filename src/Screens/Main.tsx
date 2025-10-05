import { useEffect } from "react";
import BookAddForm from "../components/BookAddForm";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { userActions } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/useAppDispatch";
import { useAppSelector } from "../redux/useAppSelector";
import {
  LocalStorageController,
  PersistenceStorageKey,
} from "../storage/LocalStorageController";

const Main = () => {
  const { loading, googleSignIn, googleSignOut } = useFirebaseAuth();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userReducer.user);

  const siginHandler = () => {
    googleSignIn()
      .then((user) => {
        dispatch(userActions.setUser(user));
        LocalStorageController.SET_DATA(PersistenceStorageKey.USER_INFO, user);
      })
      .catch((error) => {
        console.log("error sigin", error);
      });
  };
  const signoutHandler = () => {
    googleSignOut()
      .then(() => {
        dispatch(userActions.clearUser());
        LocalStorageController.CLEAR_ALL();
      })
      .catch((error) => {
        console.log("error signout", error);
      });
  };

  const renderSignIn = () => {
    return (
      <>
        <h1>Login with Google</h1>
        <button onClick={siginHandler}>Sign In</button>
      </>
    );
  };

  const renderWelcome = () => {
    return (
      <>
        <h1>Welcome {user?.displayName}</h1>
        <h5>UID: {user?.uid}</h5>
        <button onClick={signoutHandler}>Sign Out</button>
      </>
    );
  };

  const checkUser = () => {
    const userinfo = LocalStorageController.GET_DATA(
      PersistenceStorageKey.USER_INFO
    );
    if (userinfo) {
      dispatch(userActions.setUser(userinfo));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      {user && renderWelcome()}
      <hr />

      {user && <BookAddForm />}

      {!user && renderSignIn()}
    </div>
  );
};
export default Main;

import BookAddForm from "../components/BookAddForm";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { userActions } from "../redux/slices/userSlice";
import { useAppDispatch } from "../redux/useAppDispatch";
import { useAppSelector } from "../redux/useAppSelector";

const Main = () => {
  const { loading, googleSignIn,googleSignOut } = useFirebaseAuth();

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.userReducer.user);

  const siginHandler = () => {
    googleSignIn()
      .then((user) => {
        dispatch(userActions.setUser(user));
      })
      .catch((error) => {
        console.log("error sigin", error);
      });
  };
  const signoutHandler = ()=>{
    googleSignOut().then(()=>{
      dispatch(userActions.clearUser());
    }).catch((error)=>{
      console.log("error signout",error);
    })
  }

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

  return (
    <div>
      {user && renderWelcome()}
      <hr />

      {user && <BookAddForm/>}

      {!user && renderSignIn()}
    </div>
  );
};
export default Main;

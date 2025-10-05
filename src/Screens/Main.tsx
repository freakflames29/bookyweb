import useFirebaseAuth from "../hooks/useFirebaseAuth";

const Main = () => {
  const { loading, googleSignIn } = useFirebaseAuth();


  return (
    <div>
        <h1>Login with Google</h1>
      <button onClick={()=>googleSignIn()}>Login with google</button>
    </div>
  );
};
export default Main;

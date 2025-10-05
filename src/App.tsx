
// import "./App.css";
import Main from "./Screens/Main";
import { Provider } from "react-redux";
import {store} from "./redux/Store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
}

export default App;

/******* third party packages*******/
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { auth } from "./services/firebase";
/******* created components*******/
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import SingUp from "./components/Login/SignUp/SingUp";
import { useDataLayer } from "./services/DataLayer";
/******* styles*******/
import "./App.css";

function App() {
  const [{ username }, dispatch] = useDataLayer();
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch({ type: "LOGIN", username: userAuth.displayName });
      } else {
        dispatch({ type: "LOGIN", username: null });
      }
    });
  }, []);

  return (
    <div className="app">
      {username === null ? (
        <Switch>
          <Route path="/signup" component={SingUp} />
          <Route exact path="/" component={Login} />
        </Switch>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;

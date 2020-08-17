import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AuthRoute from "./util/AuthRoute";

// // import jwtDecode from "jwt-decode";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Pricing from "./components/Pricing/Pricing";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

// import NotFound from "./components/NotFound/NotFound";

export const UserContext = createContext([]);

const App = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getRefreshToken() {
      const userCredential = await (
        await fetch("https://auth7.herokuapp.com/api/user/refreshtoken", {
          method: "POST",
          credentials: "include", // Needed to include the cookie
          crossDomain: true,
          mode: "cors",
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
        })
      ).json();

      // let url = "https://auth7.herokuapp.com/api/user/refreshtoken";

      // let axiosConfig = {
      //   headers: {
      //     "Content-Type": "application/json;charset=UTF-8",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Credentials": true,
      //   },
      // };

      // const userCredential = await axios.post(url, axiosConfig, {
      //   withCredentials: true,
      //   cors: true,
      //   mode: "cors",
      // });

      if (userCredential.accesstoken) {
        setUser({
          accesstoken: userCredential.accesstoken,
          isAuthenticated: true,
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    getRefreshToken();
  }, []);

  if (loading) return <div>Loding...</div>;

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Route path="/" component={Nav} />
        <Switch>
          <AuthRoute
            path="/home"
            exact
            component={Home}
            isAuthenticated={user.isAuthenticated}
          />
          <Route path="/Pricing" exact component={Pricing} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Signup} />

          {/* //         <Route path="" component={NotFound} /> */}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};
export default App;

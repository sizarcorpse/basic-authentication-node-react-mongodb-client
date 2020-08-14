import React, { createContext, useContext, useEffect, useState } from "react";
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
        await fetch("/api/user/refreshtoken", {
          method: "POST",
          credentials: "include", // Needed to include the cookie
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
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

  if (loading) return <div>Loding..</div>;

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

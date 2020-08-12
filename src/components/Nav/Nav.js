import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { UserContext } from "../../App";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";

import LinearProgress from "@material-ui/core/LinearProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [user, setUser] = useContext(UserContext);

  const logOut = async () => {
    await fetch("/api/user/logout", {
      method: "POST",
      credentials: "include", // Needed to include the cookie
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accesstoken}`,
      },
    });
    // Clear user from context
    setUser({});
    // Navigate back to startpage
    props.history.push("/");
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box className={classes.title}>
            <Link
              to={"/Home"}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Typography variant="h6" className={classes.title}>
                Home
              </Typography>
            </Link>
          </Box>

          {user.isAuthenticated === true ? (
            <Box>
              <Link to={"/logout"} onClick={logOut}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://source.unsplash.com/random"
                />
              </Link>
            </Box>
          ) : (
            <Box className={classes.box}>
              <Link
                to={"/pricing"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Pricing</Button>
              </Link>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Login</Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

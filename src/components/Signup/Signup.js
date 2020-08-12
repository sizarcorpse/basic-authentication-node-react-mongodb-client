import React, { useState } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "../../App";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Alert from "@material-ui/lab/Alert";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  const classes = useStyles();
  const [logingError, setLogingError] = useState("");

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^[a-z0-9_.]+$/, "Enter a Valid Username")
      .trim()
      .min(4, "Username is Too Short")
      .max(30, "Username is Too Long")
      .lowercase()
      .required(),
    email: Yup.string()
      .email("Please Enter A Valid Email")
      .min(8, "Please Enter A Valid Email")
      .max(30, "Eamil is Too Large")
      .lowercase()
      .required("Email Can Not Be Empty"),
    password: Yup.string().min(8),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { username, email, password } = values;

    const userCredential = await (
      await fetch("/api/user/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
    ).json();
    console.log(userCredential);

    if (userCredential.success) {
      props.history.push("/login");
    } else {
      setLogingError(userCredential.error);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
              } = props;
              return (
                <Form className={classes.form}>
                  {logingError && (
                    <div className={classes.root2}>
                      <Alert severity="error">{logingError}</Alert>
                    </div>
                  )}
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        error={touched.username && Boolean(errors.username)}
                        fullWidth
                      >
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          id="username"
                          value={values.username}
                          label="Username"
                          name="username"
                          autoComplete="username"
                          autoFocus
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormHelperText id="component-error-text">
                          {touched.username ? errors.username : ""}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        error={touched.email && Boolean(errors.email)}
                        fullWidth
                      >
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          id="email"
                          value={values.email}
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormHelperText id="component-error-text">
                          {touched.email ? errors.email : ""}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        error={touched.password && Boolean(errors.password)}
                        fullWidth
                      >
                        <TextField
                          variant="outlined"
                          type="password"
                          margin="normal"
                          required
                          id="password"
                          value={values.password}
                          label="Password"
                          name="password"
                          autoComplete="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <FormHelperText id="component-error-text">
                          {touched.password ? errors.password : ""}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign Up
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link
                          href="#"
                          variant="body2"
                          style={{ textDecoration: "none" }}
                        >
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          to={"/login"}
                          variant="body2"
                          style={{ textDecoration: "none" }}
                        >
                          {"You have an account? Sign in"}
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
}

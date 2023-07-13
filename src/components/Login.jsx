import { Button, Container, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import {
  setEmail,
  setPassword,
  setError,
  resetForm,
  setAuthStatus,
} from "../slices/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./style.css";

const Login = () => {
  const dispatch = useDispatch();
  const { email, password, error, authStatus } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Singed in user: ", user);
        dispatch(setAuthStatus(true));
        navigate("/main");
      })
      .catch((error) => {
        // const errorCode = error.code;
        dispatch(setError(error.message));
        console.log("An error occured: ", error);
      });
    dispatch(resetForm());
  };
  console.log(authStatus);

  console.log(auth?.currentUser?.email);
  return (
    <Container
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: " center",
      }}
    >
      <h2 style={{ color: "" }}>Login</h2>

      <TextField
        sx={{ width: { xl: 400, l: 350, md: 300 } }}
        id="outlined-basic"
        label="email"
        variant="outlined"
        value={email}
        type="email"
        onChange={handleEmailChange}
      />

      <p style={{ color: "red" }}>{error}</p>

      <TextField
        sx={{ width: { xl: 400, l: 350, md: 300 }, marginBottom: "20px" }}
        id="outlined-basic"
        label="password"
        variant="outlined"
        value={password}
        type="password"
        onChange={handlePasswordChange}
      />

      <Button
        sx={{ width: { xl: 400, l: 350, md: 300 }, marginBottom: "20px" }}
        variant="contained"
        onClick={handleLogin}
        className="btn"
      >
        Login
      </Button>
      <div className="input-form__link2">
        <span style={{ color: "grey" }}>If you have not account please</span>{" "}
        <Link style={{ color: "red" }} to="/">
          Register
        </Link>
      </div>
    </Container>
  );
};

export default Login;

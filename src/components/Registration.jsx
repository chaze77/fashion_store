import React from "react";
import { Button, Container, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setError,
  resetForm,
} from "../slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Registration = () => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    dispatch(setEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    dispatch(setPassword(e.target.value));
  };

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered user: ", user);
        navigate("/main");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        dispatch(setError(error.message));
        console.log("An error occured: ", error);
      });
  };

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
      <h2>Register</h2>

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
        onClick={handleRegister}
      >
        Register
      </Button>
      <div className="input-form__link2">
        <span style={{ color: "grey" }}>Already have an account?</span>{" "}
        <Link to="/login" style={{ color: "red" }}>
          Login
        </Link>
      </div>
    </Container>
  );
};

export default Registration;

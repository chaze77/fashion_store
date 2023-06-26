import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  error: "",
  user: null,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetForm: (state) => {
      state.email = "";
      state.password = "";
      // state.error = "";
    },
    setUser: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
      state.isAdmin =
        state.user?.uid === "hppnVNQfU0eed2DsslZtXahEhUj1" ? true : false;
    },
    resetUser: (state) => {
      state.user = "";
    },
  },
});

export const {
  setEmail,
  setPassword,
  setError,
  resetForm,
  setUser,
  resetUser,
} = authSlice.actions;

export default authSlice.reducer;

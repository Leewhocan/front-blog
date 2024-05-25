import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchAuthUser = createAsyncThunk(
  "auth/fetchAuthUser",
  async () => {
    const { data } = await axios.get("/auth/me");
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "register/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const initialState = {
  user: {
    data: null,
    status: "loading",
    role: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user.data = null;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.user.status = "loading";
      state.user.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.user.status = "loaded";
      state.user.data = action.payload;
      state.user.role = action.payload.role;
    },
    [fetchUserData.rejected]: (state) => {
      state.user.status = "error";
      state.user.data = null;
    },
    [fetchAuthUser.pending]: (state) => {
      state.user.status = "loading";
      state.user.data = null;
    },
    [fetchAuthUser.fulfilled]: (state, action) => {
      state.user.status = "loaded";
      state.user.data = action.payload;
      state.user.role = action.payload.role;
    },
    [fetchAuthUser.rejected]: (state) => {
      state.user.status = "error";
      state.user.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.user.status = "loading";
      state.user.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.user.status = "loaded";
      state.user.data = action.payload;
      state.user.role = action.payload.role;
    },
    [fetchRegister.rejected]: (state) => {
      state.user.status = "error";
      state.user.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.user.data);

export const { logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { postRedusers } from "./slices/posts";
import { authReducer } from "./slices/auth";
const store = configureStore({
  reducer: {
    posts: postRedusers,
    auth: authReducer,
  },
});

export default store;

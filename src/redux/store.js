import { configureStore } from "@reduxjs/toolkit";
import { postRedusers } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { commentReducers } from "./slices/comments";
const store = configureStore({
  reducer: {
    posts: postRedusers,
    auth: authReducer,
    comments: commentReducers,
  },
});

export default store;

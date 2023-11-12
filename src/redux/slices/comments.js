import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchComments = createAsyncThunk(
  "/comments/fetchComments",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);

const initialState = {
  comments: [],
  status: "loading",
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: {
    [fetchComments.pending]: (state) => {
      state.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.status = "loaded";
      state.comments = action.payload;
    },
    [fetchComments.error]: (state) => {
      state.comments = [];
      state.status = "error";
    },
  },
});

export const commentReducers = commentSlice.reducer;

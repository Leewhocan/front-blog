import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
export const fetchLastComments = createAsyncThunk(
  "/comments/fetchComments",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);

export const fetchCommentsForPost = createAsyncThunk(
  "/comments/fetchCommentsForPost",
  async (id) => {
    const { data } = await axios.get(`/comments/${id}`);
    return data;
  }
);

export const fetchDeleteComment = createAsyncThunk(
  "/comments/deleteComments",
  async (obj) => {
    const res = await axios.delete(
      `/posts/${obj.postId}/comments/${obj.commentId}`
    );
    return res.data;
  }
);

export const fetchPostComment = createAsyncThunk(
  "/comments/fetchPostComment",
  async (obj) => {
    const response = await axios.post(`/posts/${obj.id}`, { text: obj.text });
    return response.data;
  }
);

const initialState = {
  lastComments: {
    comments: [],
    status: "loading",
  },
  allComments: {
    commentary: [],
    status: "loading",
  },
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: {
    [fetchLastComments.pending]: (state) => {
      state.lastComments.status = "loading";
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.lastComments.status = "loaded";
      state.lastComments.comments = action.payload;
    },
    [fetchLastComments.error]: (state) => {
      state.lastComments.comments = [];
      state.lastComments.status = "error";
    },
    [fetchCommentsForPost.pending]: (state) => {
      state.allComments.status = "loading";
    },
    [fetchCommentsForPost.fulfilled]: (state, action) => {
      state.allComments.status = "loaded";
      state.allComments.commentary = action.payload;
    },
    [fetchCommentsForPost.error]: (state) => {
      state.allComments.commentary = [];
      state.allComments.status = "error";
    },
    [fetchPostComment.pending]: (state) => {
      state.allComments.status = "loading";
    },
    [fetchPostComment.fulfilled]: (state, action) => {
      state.allComments.status = "loaded";
      state.allComments.commentary.push(action.payload);
    },
    [fetchPostComment.error]: (state) => {
      state.allComments.status = "error";
    },

    [fetchDeleteComment.rejected]: (state) => {
      state.posts.status = "error";
    },
  },
});

export const commentReducers = commentSlice.reducer;

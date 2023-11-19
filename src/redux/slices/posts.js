import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async (tag) => {
  const { data } = await axios.get(`/posts?tag=${tag}`);
  return data;
});

export const fetchTags = createAsyncThunk("/tags/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  console.log(data)
  return data;
});
export const fetchRemovePosts = createAsyncThunk(
  "/posts/fetchRemovePosts",
  async (id) => {
    const res = await axios.delete(`/posts/${id}`);
    return res.data;
  }
);
const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  initialTag: {
    tag: "",
  },
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setSearchTag: (state, action) => {
      state.initialTag.tag = action.payload;
    },
  },
  extraReducers: {
    // статьи
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = "loaded";
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    },
    //теги
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = "error";
      state.tags.items = [];
    },
    // удаление статьи
    [fetchRemovePosts.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    [fetchRemovePosts.rejected]: (state) => {
      state.posts.status = "error";
    },
  },
});

export const postRedusers = postsSlice.reducer;

export const { setSearchTag } = postsSlice.actions;

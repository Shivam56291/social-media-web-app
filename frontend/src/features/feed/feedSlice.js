import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  loading: true,
};

const feedSlice = createSlice({
  name: "feed",

  initialState,

  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },

    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },

    restorePost: (state, action) => {
      state.posts.unshift(action.payload);
    },

    /* EDIT */
    updatePost: (state, action) => {
      const updatedPost = action.payload;

      state.posts = state.posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post,
      );
    },
    incrementCommentsCount: (state, action) => {
      const post = state.posts.find((p) => p.id === action.payload);

      if (post) {
        post.comments_count += 1;
      }
    },

    /* OPTIMISTIC LIKE */
    toggleLikeOptimistic: (state, action) => {
      const postId = action.payload;

      const post = state.posts.find((p) => p.id === postId);

      if (!post) return;

      post.is_liked = !post.is_liked;

      if (post.is_liked) {
        post.likes_count += 1;
      } else {
        post.likes_count -= 1;
      }
    },
  },
});

export const {
  setPosts,
  setLoading,

  addPost,
  removePost,
  restorePost,
  updatePost,
  incrementCommentsCount,

  toggleLikeOptimistic,
} = feedSlice.actions;

export default feedSlice.reducer;

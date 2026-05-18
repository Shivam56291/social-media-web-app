import { createSlice } from "@reduxjs/toolkit";

const initialCommentState = {
  comments: [],
  loading: false,
  backgroundLoading: false,
  loaded: false,
  nextCursor: null,
  hasMore: true,
  error: null,
  optimisticIds: [],
};

const initialState = {
  commentsByPost: {},
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,

  reducers: {
    initializeCommentsState: (state, action) => {
      const postId = action.payload;

      if (!state.commentsByPost[postId]) {
        state.commentsByPost[postId] = {
          ...initialCommentState,
        };
      }
    },

    setCommentsLoading: (state, action) => {
      const { postId, loading } = action.payload;

      state.commentsByPost[postId].loading = loading;
    },

    setBackgroundCommentsLoading: (state, action) => {
      const { postId, loading } = action.payload;

      state.commentsByPost[postId].backgroundLoading = loading;
    },

    setCommentsError: (state, action) => {
      const { postId, error } = action.payload;

      state.commentsByPost[postId].error = error;
    },

    clearCommentsError: (state, action) => {
      const postId = action.payload;

      state.commentsByPost[postId].error = null;
    },

    setComments: (state, action) => {
      const { postId, comments, nextCursor, hasMore } = action.payload;

      state.commentsByPost[postId].comments = comments;

      state.commentsByPost[postId].loaded = true;

      state.commentsByPost[postId].nextCursor = nextCursor;

      state.commentsByPost[postId].hasMore = hasMore;

      state.commentsByPost[postId].error = null;
    },

    appendComments: (state, action) => {
      const { postId, comments, nextCursor, hasMore } = action.payload;

      const existing = state.commentsByPost[postId].comments;

      const existingIds = new Set(existing.map((c) => c.id));

      const filtered = comments.filter((c) => !existingIds.has(c.id));

      existing.push(...filtered);

      state.commentsByPost[postId].nextCursor = nextCursor;

      state.commentsByPost[postId].hasMore = hasMore;
    },

    addOptimisticComment: (state, action) => {
      const { postId, comment } = action.payload;

      state.commentsByPost[postId].comments.unshift(comment);

      state.commentsByPost[postId].optimisticIds.push(comment.id);
    },

    replaceOptimisticComment: (state, action) => {
      const { postId, tempId, realComment } = action.payload;

      const postState = state.commentsByPost[postId];

      const comments = postState.comments;

      const index = comments.findIndex((c) => c.id === tempId);

      if (index !== -1) {
        comments[index] = realComment;
      }

      postState.optimisticIds = postState.optimisticIds.filter(
        (id) => id !== tempId,
      );
    },

    removeOptimisticComment: (state, action) => {
      const { postId, tempId } = action.payload;

      const postState = state.commentsByPost[postId];

      postState.comments = postState.comments.filter((c) => c.id !== tempId);

      postState.optimisticIds = postState.optimisticIds.filter(
        (id) => id !== tempId,
      );
    },

    resetCommentsState: (state, action) => {
      const postId = action.payload;

      state.commentsByPost[postId] = {
        ...initialCommentState,
      };
    },
  },
});

export const {
  initializeCommentsState,
  setCommentsLoading,
  setBackgroundCommentsLoading,
  setCommentsError,
  clearCommentsError,
  setComments,
  appendComments,
  addOptimisticComment,
  replaceOptimisticComment,
  removeOptimisticComment,
  resetCommentsState,
} = commentsSlice.actions;

export default commentsSlice.reducer;

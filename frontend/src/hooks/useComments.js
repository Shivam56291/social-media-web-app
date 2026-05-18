import { useDispatch, useSelector } from "react-redux";

import {
  initializeCommentsState,
  setComments,
  appendComments,
  setCommentsLoading,
} from "../features/comments/commentsSlice";

import { postService } from "../services/postService";

export function useComments(postId) {
  const dispatch = useDispatch();

  const commentsState = useSelector(
    (state) => state.comments.commentsByPost[postId],
  );

  const initialize = () => {
    dispatch(initializeCommentsState(postId));
  };

  const fetchInitial = async () => {
    if (commentsState?.loaded) return;

    dispatch(
      setCommentsLoading({
        postId,
        loading: true,
      }),
    );

    try {
      const data = await postService.getComments(postId);

      dispatch(
        setComments({
          postId,
          comments: data.results,
          nextCursor: data.next,
          hasMore: !!data.next,
        }),
      );
    } finally {
      dispatch(
        setCommentsLoading({
          postId,
          loading: false,
        }),
      );
    }
  };

  const fetchMore = async () => {
    if (!commentsState?.hasMore) return;

    if (commentsState?.loading) return;

    dispatch(
      setCommentsLoading({
        postId,
        loading: true,
      }),
    );

    try {
      const data = await postService.getComments(
        postId,
        commentsState.nextCursor,
      );

      dispatch(
        appendComments({
          postId,
          comments: data.results,
          nextCursor: data.next,
          hasMore: !!data.next,
        }),
      );
    } finally {
      dispatch(
        setCommentsLoading({
          postId,
          loading: false,
        }),
      );
    }
  };

  return {
    commentsState,
    initialize,
    fetchInitial,
    fetchMore,
  };
}

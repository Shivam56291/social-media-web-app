import {
  addOptimisticComment,
  replaceOptimisticComment,
} from "../../features/comments/commentsSlice";

import {
  incrementCommentsCount,
} from "../../features/feed/feedSlice";

import { postService }
  from "../../services/postService";

export const createComment =
  (postId, content) =>
  async (
    dispatch,
    getState
  ) => {

    const user =
      getState()
        .auth.user;

    const tempId =
      `temp-${Date.now()}`;

    const optimistic =
      {
        id: tempId,

        content,

        created_at:
          new Date().toISOString(),

        author_detail: user,

        optimistic: true,
      };

    dispatch(
      addOptimisticComment({
        postId,
        comment:
          optimistic,
      })
    );

    dispatch(
      incrementCommentsCount(
        postId
      )
    );

    try {

      const realComment =
        await postService.createComment(
          postId,
          { content }
        );

      dispatch(
        replaceOptimisticComment({
          postId,
          tempId,
          realComment,
        })
      );

    } catch (error) {

      console.log(error);
    }
  };
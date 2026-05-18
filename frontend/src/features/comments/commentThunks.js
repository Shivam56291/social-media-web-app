import {
  addOptimisticComment,
  replaceOptimisticComment,
  removeOptimisticComment,
} from "./commentsSlice";

import {
  incrementCommentsCount,
} from "../feed/feedSlice";

import { postService } from "../../services/postService";

export const createComment =
  (postId, content) =>
  async (dispatch, getState) => {

    const user =
      getState().auth.user;

    const tempId =
      `temp-${Date.now()}`;

    const optimisticComment = {
      id: tempId,

      content,

      created_at:
        new Date().toISOString(),

      author_detail: user,

      optimistic: true,
    };

    /* ADD OPTIMISTIC COMMENT */
    dispatch(
      addOptimisticComment({
        postId,
        comment: optimisticComment,
      })
    );

    /* UPDATE COMMENT COUNT */
    dispatch(
      incrementCommentsCount(postId)
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

      dispatch(
        removeOptimisticComment({
          postId,
          tempId,
        })
      );
    }
  };
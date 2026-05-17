import api from "./api";

export const postService = {

  async createPost(data) {

    const response =
      await api.post(
        "/posts/create/",
        data
      );

    return response.data;
  },

  /* SHARE POST UTILITY */
  async sharePost(postId, data) {
    const response = await api.post(
      `/posts/${postId}/share/`,
      data
    );

    return response.data;
  },

  async getFeed() {

    const response =
      await api.get("/posts/feed/");

    return response.data;
  },

  async toggleLike(postId) {

    const response =
      await api.post(
        `/posts/${postId}/like/`
      );

    return response.data;
  },

  async deletePost(postId) {

    const response =
      await api.delete(
        `/posts/${postId}/`
      );

    return response.data;
  },

  /* EDIT POST */
  async updatePost(
    postId,
    data
  ) {

    const response =
      await api.patch(
        `/posts/${postId}/`,
        data
      );

    return response.data;
  },

  async getUserPosts(userId) {
    const response =
      await api.get(
        `/posts/user/${userId}/`
      );

    return response.data;
  },

  async getComments (
    postId
  ) {

    const response =
      await api.get(
        `/posts/${postId}/comments/`
      );

    return response.data;
  },

  async createComment (
    postId,
    data
  ) {

    const response =
      await api.post(
        `/posts/${postId}/comments/`,
        data
      );

    return response.data;
  },
};
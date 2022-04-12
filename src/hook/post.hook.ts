import { useCallback } from 'react';

import PostService, { PostServiceReturnType } from '../service/post.service';

const usePost = () => {
  const createPost = useCallback(async (userId: string, name: string, description?: string) => {
    const res = await PostService.createPost({
      name,
      description,
      userPostsId: userId,
    });
    return res.data?.createPost;
  }, []);

  const updatePost = useCallback(async (id: string, name?: string, description?: string) => {
    const res = await PostService.updatePost({
      id,
      name,
      description,
    });
    return res.data?.updatePost;
  }, []);

  const deletePost = useCallback(async (id: string) => {
    const res = await PostService.deletePost({ id });
    return res.data?.deletePost;
  }, []);

  const getPost = useCallback(async (id: string) => {
    return await PostService.getPost(id);
  }, []);

  return { createPost, updatePost, deletePost, getPost };
};

export type UsePostReturnType = {
  createPostRT: Exclude<PostServiceReturnType['createPostRT']['data'], undefined>['createPost'];
  updatePostRT: Exclude<PostServiceReturnType['updatePostRT']['data'], undefined>['updatePost'];
  deletePostRT: Exclude<PostServiceReturnType['deletePostRT']['data'], undefined>['deletePost'];
  getPostRT: PostServiceReturnType['getPostRT'];
};

export default usePost;

import { useState, useEffect, useCallback } from 'react';

import PostService, { PostServiceReturnType } from '../service/post.service';

const usePost = () => {
  const [err, setErr] = useState<unknown>();

  useEffect(() => {
    if (err) {
      console.error('usePost Error : ', err);
    }
  }, [err]);

  const createPost = useCallback(async (userId: string, name: string, description?: string) => {
    try {
      const res = await PostService.createPost({
        name,
        description,
        userPostsId: userId,
      });
      return res.data?.createPost;
    } catch (err) {
      setErr(err);
    }
    return undefined;
  }, []);

  const updatePost = useCallback(async (id: string, name?: string, description?: string) => {
    try {
      const res = await PostService.updatePost({
        id,
        name,
        description,
      });
      return res.data?.updatePost;
    } catch (err) {
      setErr(err);
    }
    return undefined;
  }, []);

  const deletePost = useCallback(async (id: string) => {
    try {
      const res = await PostService.deletePost({ id });
      return res.data?.deletePost;
    } catch (err) {
      setErr(err);
    }
    return undefined;
  }, []);

  const getPost = useCallback(async (id: string) => {
    try {
      return await PostService.getPost(id);
    } catch (err) {
      setErr(err);
    }
    return undefined;
  }, []);

  const listPosts = useCallback(async () => {
    try {
      return await PostService.listPosts();
    } catch (err) {
      setErr(err);
    }
    return undefined;
  }, []);

  return { createPost, updatePost, deletePost, getPost, listPosts };
};

export type UsePostReturnType = {
  createPostRT: Exclude<PostServiceReturnType['createPostRT']['data'], undefined>['createPost'];
  updatePostRT: Exclude<PostServiceReturnType['updatePostRT']['data'], undefined>['updatePost'];
  deletePostRT: Exclude<PostServiceReturnType['deletePostRT']['data'], undefined>['deletePost'];
  getPostRT: PostServiceReturnType['getPostRT'];
  listPostsRT: PostServiceReturnType['listPostsRT'];
};

export default usePost;

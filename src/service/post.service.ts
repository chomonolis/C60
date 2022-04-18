import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';

import { createPost, deletePost, updatePost } from '../graphql/mutations';
import { getPost, listPosts } from '../graphql/queries';
import {
  CreatePostInput,
  CreatePostMutation,
  DeletePostInput,
  DeletePostMutation,
  GetPostQuery,
  ListPostsQuery,
  UpdatePostInput,
  UpdatePostMutation,
} from '../API';
import { PromiseType } from '../utils/typeUtils';

const PostService = {
  createPost: async (input: CreatePostInput) => {
    return API.graphql(graphqlOperation(createPost, { input })) as Promise<GraphQLResult<CreatePostMutation>>;
  },

  updatePost: async (input: UpdatePostInput) => {
    return API.graphql(graphqlOperation(updatePost, { input })) as Promise<GraphQLResult<UpdatePostMutation>>;
  },

  deletePost: async (input: DeletePostInput) => {
    return API.graphql(graphqlOperation(deletePost, { input })) as Promise<GraphQLResult<DeletePostMutation>>;
  },

  getPost: async (id: string) => {
    const result = await API.graphql(graphqlOperation(getPost, { id }));
    if ('data' in result && result.data) {
      const data = result.data as GetPostQuery;
      return data.getPost;
    }
    return undefined;
  },

  listPosts: async () => {
    const result = (await API.graphql(graphqlOperation(listPosts))) as GraphQLResult<ListPostsQuery>;
    return result.data?.listPosts;
  },
};

export type PostServiceReturnType = {
  createPostRT: PromiseType<ReturnType<typeof PostService.createPost>>;
  updatePostRT: PromiseType<ReturnType<typeof PostService.updatePost>>;
  deletePostRT: PromiseType<ReturnType<typeof PostService.deletePost>>;
  getPostRT: PromiseType<ReturnType<typeof PostService.getPost>>;
  listPostsRT: PromiseType<ReturnType<typeof PostService.listPosts>>;
};

export default PostService;

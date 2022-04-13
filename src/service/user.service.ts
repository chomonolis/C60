import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api';

import { updateUser } from '../graphql/mutations';
import { getUser } from '../graphql/queries';
import { GetUserQuery, UpdateUserInput, UpdateUserMutation } from '../API';
import { PromiseType } from '../utils/typeUtils';

const UserService = {
  updateUser: async (input: UpdateUserInput) => {
    return API.graphql(graphqlOperation(updateUser, { input })) as Promise<GraphQLResult<UpdateUserMutation>>;
  },

  getUser: async (id: string) => {
    const result = await API.graphql(graphqlOperation(getUser, { id }));
    if ('data' in result && result.data) {
      const data = result.data as GetUserQuery;
      return data.getUser;
    }
    return undefined;
  },
};

export type UserServiceReturnType = {
  updateUserRT: PromiseType<ReturnType<typeof UserService.updateUser>>;
  getUserRT: PromiseType<ReturnType<typeof UserService.getUser>>;
};

export default UserService;

import { useCallback } from 'react';

import UserService, { UserServiceReturnType } from '../service/user.service';

const useUser = () => {
  const updateUser = useCallback(async (id: string, name?: string) => {
    const res = await UserService.updateUser({
      id,
      name,
    });
    return res.data?.updateUser;
  }, []);

  const getUser = useCallback(async (id: string) => {
    return await UserService.getUser(id);
  }, []);

  return { updateUser, getUser };
};

export type UseUserReturnType = {
  updateUserRT: Exclude<UserServiceReturnType['updateUserRT']['data'], undefined>['updateUser'];
  getUserRT: UserServiceReturnType['getUserRT'];
};

export default useUser;

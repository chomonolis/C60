import { useEffect, useCallback, useState } from 'react';

import UserService, { UserServiceReturnType } from '../service/user.service';

const useUser = () => {
  const [err, setErr] = useState<unknown>();

  useEffect(() => {
    if (err) {
      console.error('useUser Error : ', err);
    }
  }, [err]);

  const updateUser = useCallback(async (id: string, name?: string) => {
    try {
      const res = await UserService.updateUser({
        id,
        name,
      });
      return res.data?.updateUser;
    } catch (err) {
      setErr(err);
    }
    return undefined;
  }, []);

  const getUser = useCallback(async (id: string) => {
    try {
      return await UserService.getUser(id);
    } catch (err) {
      setErr(err);
    }
    return undefined;
  }, []);

  return { updateUser, getUser };
};

export type UseUserReturnType = {
  updateUserRT: Exclude<UserServiceReturnType['updateUserRT']['data'], undefined>['updateUser'];
  getUserRT: UserServiceReturnType['getUserRT'];
};

export default useUser;

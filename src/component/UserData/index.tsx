import { useContext } from 'react';

import { UserDataContext } from '../../App';

const UserData = () => {
  const { userId } = useContext(UserDataContext);
  return <>{userId}</>;
};

export default UserData;

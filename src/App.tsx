import { useState, createContext } from 'react';
import { Amplify } from 'aws-amplify';

import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

import UserData from './component/UserData';
import { hasProperty } from './utils/typeUtils';

type UserDataContextType = {
  userId: string;
};
export const UserDataContext = createContext<UserDataContextType>({ userId: '' });

export default function App() {
  const [userId, setUserId] = useState<string>('');
  return (
    <AmplifyProvider>
      <Authenticator>
        {({ signOut, user }) => {
          if (user?.attributes && hasProperty(user.attributes, 'custom:userid')) {
            if (typeof user.attributes['custom:userid'] === 'string' && user.attributes['custom:userid'] !== userId) {
              setUserId(user.attributes['custom:userid']);
            }
          }
          return (
            <UserDataContext.Provider value={{ userId }}>
              <main>
                <h1>Hello {user.username}</h1>
                <h1>{userId}</h1>
                <button
                  onClick={() => {
                    setUserId('');
                    signOut();
                  }}
                >
                  Sign out
                </button>
              </main>
              <UserData />
            </UserDataContext.Provider>
          );
        }}
      </Authenticator>
    </AmplifyProvider>
  );
}

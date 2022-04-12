import { createContext } from 'react';
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
  return (
    <AmplifyProvider>
      <Authenticator>
        {({ signOut, user }) => {
          if (user?.attributes && hasProperty(user.attributes, 'custom:userid')) {
            if (typeof user.attributes['custom:userid'] === 'string') {
              return (
                <UserDataContext.Provider value={{ userId: user.attributes['custom:userid'] }}>
                  <main>
                    <h1>Hello {user.username}</h1>
                    <button onClick={signOut}>Sign out</button>
                  </main>
                  <UserData />
                </UserDataContext.Provider>
              );
            }
          }
          return <>Not Authenticated</>;
        }}
      </Authenticator>
    </AmplifyProvider>
  );
}

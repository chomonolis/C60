import { useState } from 'react';
import { Amplify } from 'aws-amplify';

import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

export default function App() {
  const [userId, setUserId] = useState<string>('');
  return (
    <AmplifyProvider>
      <Authenticator>
        {({ signOut, user }) => {
          if (userId === '') {
            user.getUserAttributes((err, result) => {
              if (err) {
                console.error(err);
              }
              if (result !== undefined) {
                for (const obj of result) {
                  if (obj.Name === 'custom:userid' && obj.Value !== userId) {
                    setUserId(obj.Value);
                  }
                }
              }
            });
          }
          return (
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
          );
        }}
      </Authenticator>
    </AmplifyProvider>
  );
}

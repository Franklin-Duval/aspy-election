import { useSession } from 'next-auth/client';
import React from 'react';
import { Unauthorized } from '../Unathorized';

export const AuthGuard: React.FC<{}> = ({ children }) => {
  const [session, loading] = useSession();

  if (loading) return null;

  if (!session) {
    return <Unauthorized />;
  }

  return <> {children} </>;
};

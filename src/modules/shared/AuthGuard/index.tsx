import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React from 'react';
import { Unauthorized } from '../Unathorized';

export const AuthGuard: React.FC<{}> = ({ children }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) return null;

  if (!session) {
    return <Unauthorized />;
  }

  return <> {children} </>;
};

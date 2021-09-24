import { useSession } from 'next-auth/client';
import React from 'react';
import { ConnectedUser } from 'server/shared/customTypes';
import { Unauthorized } from '../Unathorized';

export const AuthGuard: React.FC<{}> = ({ children }) => {
  const [session, loading] = useSession();

  if (loading) return null;

  if (!session) {
    return <Unauthorized />;
  }

  return <> {children} </>;
};

const Guard: React.FC<{
  role: 'voter' | 'candidate' | 'admin';
  errorText?: string;
}> = ({ children, role, errorText }) => {
  const [session, loading] = useSession();
  if (session) {
    const user = session.user as ConnectedUser;

    return role == user.role ? (
      <>{children} </>
    ) : (
      <div>
        <h2 style={{ textAlign: 'center' }}>{errorText}</h2>
      </div>
    );
  } else {
    return <></>;
  }
};

export const CandidateGuard = ({
  displayMessage,
  children,
}: {
  displayMessage?: boolean;
  children: React.ReactNode;
}) => (
  <Guard
    role='candidate'
    errorText={
      displayMessage ? 'You must be a candidate to view this' : undefined
    }
  >
    {children}
  </Guard>
);

export const AdminGuard = ({
  displayMessage,
  children,
}: {
  displayMessage?: boolean;
  children: React.ReactNode;
}) => (
  <Guard
    role='admin'
    errorText={
      displayMessage ? 'You must be an administrator to view this' : undefined
    }
  >
    {children}
  </Guard>
);

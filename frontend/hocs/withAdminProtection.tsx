'use client';

import { ComponentType, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useFetchAndSetUser } from '@/hooks/useFetchAndSetUser';
import { selectAccessToken, selectRole } from '@/redux/auth/auth.slice';

const withAdminProtection = (WrappedComponent: ComponentType<any>) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const { isLoading } = useFetchAndSetUser();
    const accessToken = useSelector(selectAccessToken);
    const userRole = useSelector(selectRole);
    const isLoggedIn = Boolean(accessToken);
    const isAdmin = userRole?.toLowerCase() === 'admin';

    useEffect(() => {
      if (!isLoading && !isLoggedIn) {
        router.push('/login');
      }
    }, [isLoading, isLoggedIn, isAdmin, router]);

    return isAdmin ? (
      <WrappedComponent {...props} />
    ) : (
      <div>
        <h1>Access Denied</h1>
        <p>You don&apos;t have permission to access this page.</p>
      </div>
    );
  };
};

export default withAdminProtection;

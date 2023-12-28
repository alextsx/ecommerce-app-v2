import { ComponentType, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useFetchAndSetUser } from '@/hooks/useFetchAndSetUser';
import { selectAccessToken } from '@/redux/auth/auth.slice';

const withAuthenticationProtection = (WrappedComponent: ComponentType<any>) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const router = useRouter();
    const { isLoading } = useFetchAndSetUser();
    const accessToken = useSelector(selectAccessToken);
    const isLoggedIn = Boolean(accessToken);

    useEffect(() => {
      if (!isLoading && !isLoggedIn) {
        router.push('/login');
      }
    }, [isLoading, isLoggedIn, router]);

    return isLoggedIn ? (
      <WrappedComponent {...props} />
    ) : (
      <div>
        <h1>Access Denied</h1>
        <p>You must be logged in to view this page!</p>
      </div>
    );
  };
};

export default withAuthenticationProtection;

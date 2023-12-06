import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWhoQuery } from '@/redux/auth/authApiSlice';
import { setAuthDetails } from '@/redux/auth/authSlice';

export const useFetchAndSetUser = () => {
  const { data: user, isLoading, isFetching } = useWhoQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading || isFetching) {
      return;
    }

    if (user) {
      dispatch(setAuthDetails(user));
    }
  }, [user, isLoading, isFetching, dispatch]);

  return { isLoading };
};

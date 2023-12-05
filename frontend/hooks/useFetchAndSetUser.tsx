import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWhoQuery } from '@/redux/auth/authApiSlice';
import { setAuthDetails } from '@/redux/auth/authSlice';

export const useFetchAndSetUser = ({ skip = false }: { skip?: boolean }) => {
  const {
    data: user,
    isLoading,
    isFetching
  } = useWhoQuery(undefined, {
    skip
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (skip) {
      return;
    }
    if (isLoading || isFetching) {
      return;
    }

    if (user) {
      dispatch(setAuthDetails(user));
    }
  }, [user, isLoading, isFetching, dispatch, skip]);

  return { isLoading };
};

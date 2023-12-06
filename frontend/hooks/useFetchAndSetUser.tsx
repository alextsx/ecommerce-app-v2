import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWhoQuery } from '@/redux/auth/auth.api.slice';
import { setAuthDetails } from '@/redux/auth/auth.slice';
import { useGetUserDetailsQuery } from '@/redux/user-details/user-details.api.slice';
import { setUserDetails } from '@/redux/user-details/user-details.slice';

export const useFetchAndSetUser = () => {
  const {
    data: authDetails,
    isLoading: isLoadingAuthDetails,
    isFetching: isFetchingAuthDetails
  } = useWhoQuery();

  const {
    data: userDetails,
    isLoading: isLoadingUserDetails,
    isFetching: isFetchingUserDetails
  } = useGetUserDetailsQuery();

  const dispatch = useDispatch();

  const isLoading = isLoadingAuthDetails || isLoadingUserDetails;
  const isFetching = isFetchingAuthDetails || isFetchingUserDetails;

  useEffect(() => {
    if (isLoadingAuthDetails || isFetchingAuthDetails) {
      return;
    }

    if (!authDetails) {
      return;
    }

    dispatch(setAuthDetails(authDetails));
  }, [authDetails, dispatch, isFetchingAuthDetails, isLoadingAuthDetails]);

  useEffect(() => {
    if (isLoadingUserDetails || isFetchingUserDetails) {
      return;
    }

    if (!userDetails) {
      return;
    }

    dispatch(setUserDetails(userDetails));
  }, [dispatch, isFetchingUserDetails, isLoadingUserDetails, userDetails]);

  return { isLoading };
};

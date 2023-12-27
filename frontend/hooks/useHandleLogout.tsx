import { useDispatch } from 'react-redux';
import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { useLogoutMutation } from '@/redux/auth/auth.api.slice';
import { deleteCredentials } from '@/redux/auth/auth.slice';
import { useToggleToast } from './useToggleToast';

export const useHandleLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  //check if we are inside redux provider
  if (typeof logout !== 'function') {
    throw new Error('useHandleLogout must be used within a ReduxProvider');
  }

  const toggleToast = useToggleToast();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(deleteCredentials());
      toggleToast({
        description: 'You successfully logged out.',
        title: 'Successful logout',
        variant: 'constructive'
      });
    } catch (err) {
      const message = parseErrorResponse(err);
      toggleToast({
        description: message,
        title: 'Logout error',
        variant: 'destructive'
      });
    } finally {
      window.location.href = '/';
    }
  };

  return { handleLogout };
};

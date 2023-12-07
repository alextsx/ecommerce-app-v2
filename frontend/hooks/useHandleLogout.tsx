import { parseErrorResponse } from '@/lib/parseErrorResponse';
import { useLogoutMutation } from '@/redux/auth/auth.api.slice';
import { useToggleToast } from './useToggleToast';

export const useHandleLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  //check if we are inside redux provider
  if (typeof logout !== 'function') {
    throw new Error('useHandleLogout must be used within a ReduxProvider');
  }

  const toggleToast = useToggleToast();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toggleToast({
        description: 'You successfully logged out.',
        title: 'Successful logout',
        variant: 'default'
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

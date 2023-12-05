export const useRememberMe = () => {
  const deleteRememberMe = () => {
    localStorage.removeItem('rememberMe');
  };

  const getRememberMe = () => {
    const rememberMe = localStorage.getItem('rememberMe');
    return rememberMe === 'true';
  };

  const setRememberMe = (rememberMe: boolean) => {
    if (rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      deleteRememberMe();
    }
  };

  return { getRememberMe, setRememberMe, deleteRememberMe };
};

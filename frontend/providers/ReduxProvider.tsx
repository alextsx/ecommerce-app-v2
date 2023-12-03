'use client';

import { Provider } from 'react-redux';
import store from '@/redux/store';

type ReduxProviderProps = {
  children: React.ReactNode;
};

export const ReduxProvider = ({ children }: ReduxProviderProps): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

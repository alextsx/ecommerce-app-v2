import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className="md:w-7/12 w-full flex max-h-[600px] overflow-y-scroll justify-center items-center bg-background rounded-md p-1 border">
    {children}
  </div>
);

export default AuthLayout;

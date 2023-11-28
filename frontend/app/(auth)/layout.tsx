import { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => (
  <div className="sm:w-full  md:w-7/12 py-20 max-h-[850px] overflow-y-scroll flex justify-center items-center bg-background rounded-lg p-1 border">
    {children}
  </div>
);

export default AuthLayout;

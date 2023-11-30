import { Metadata } from 'next';
import { LoginForm } from '@/components/form/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login into Helix Metrics'
};

const LoginPage = () => {
  return (
    <>
      <div className="z-20 py-32 flex flex-col justify-center items-between">
        <div className=" flex w-full flex-col justify-between space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center mb-3">
            <h1 className="text-3xl font-semibold tracking-tight">Log into your account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to access your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;

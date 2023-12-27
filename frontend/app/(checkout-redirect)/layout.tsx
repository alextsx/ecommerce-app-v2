import { PropsWithChildren } from 'react';
import { Card } from '@/components/ui/card';

const RedirectLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full max-w-4xl p-4 mx-auto">
      <Card>{children}</Card>
    </div>
  );
};

export default RedirectLayout;

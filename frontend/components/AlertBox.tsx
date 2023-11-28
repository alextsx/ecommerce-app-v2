/* import { ExclamationTriangleIcon } from '@radix-ui/react-icons'; */
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export type AlertBoxProps = {
  variant: Variant;
  title: string;
  message: string;
};

export const AlertBox = ({ variant, title, message }: AlertBoxProps) => (
  <Alert variant={variant} className="border-2">
    {/*     <ExclamationTriangleIcon className="h-4 w-4" /> */}
    <AlertTitle className="font-bold">{title}</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

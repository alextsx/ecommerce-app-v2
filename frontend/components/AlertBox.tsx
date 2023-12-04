/* import { ExclamationTriangleIcon } from '@radix-ui/react-icons'; */
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export type AlertBoxProps = {
  variant: Variant;
  title: string;
  message: string | string[];
};

const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const parseMessage = (message: string | string[]) => {
  if (typeof message === 'string') {
    return capitalizeFirstLetter(message);
  }
  return message.map((m, i) => <p key={i}>{capitalizeFirstLetter(m)}</p>);
};

export const AlertBox = ({ variant, title, message }: AlertBoxProps) => (
  <Alert variant={variant} className="border-2">
    {/*     <ExclamationTriangleIcon className="h-4 w-4" /> */}
    <AlertTitle className="font-bold">{title}</AlertTitle>
    <AlertDescription>{parseMessage(message)}</AlertDescription>
  </Alert>
);

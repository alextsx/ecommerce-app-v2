import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';

export const UserDropdownHeader = () => {
  const { first_name, last_name, email } = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'test@example.com'
  };

  return (
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{`${first_name} ${last_name}`}</p>
        <p className="text-xs leading-none text-muted-foreground">{email}</p>
      </div>
    </DropdownMenuLabel>
  );
};

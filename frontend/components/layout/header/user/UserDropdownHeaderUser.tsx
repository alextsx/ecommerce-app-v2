'use client';

import { useSelector } from 'react-redux';
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { selectEmail } from '@/redux/auth/auth.slice';
import { selectFullName } from '@/redux/user-details/user-details.slice';

export const UserDropdownHeaderUser = () => {
  const email = useSelector(selectEmail);
  const full_name = useSelector(selectFullName);

  return (
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{full_name}</p>
        <p className="text-xs leading-none text-muted-foreground">{email}</p>
      </div>
    </DropdownMenuLabel>
  );
};

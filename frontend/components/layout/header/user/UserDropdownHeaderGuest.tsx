'use client';

import { useSelector } from 'react-redux';
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { selectEmail } from '@/redux/auth/auth.slice';
import { selectFullName } from '@/redux/user-details/user-details.slice';

export const UserDropdownHeaderGuest = () => {
  return (
    <DropdownMenuLabel className="font-normal">
      <p className="text-xs leading-none text-muted-foreground">You aren&apos;t logged in! </p>
    </DropdownMenuLabel>
  );
};

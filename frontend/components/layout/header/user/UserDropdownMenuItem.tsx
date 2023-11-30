'use client';

import { memo } from 'react';
import Link from 'next/link';
import { DropdownMenuItem, DropdownMenuShortcut } from '@/components/ui/dropdown-menu';

type UserDropdownMenuItemProps = {
  label: string;
  shortcut: string;
};

export const UserDropdownMenuItem = memo(
  ({ label, shortcut, ...rest }: UserDropdownMenuItemProps) => {
    //TODO should be a hook later on
    const handleLogout = () => {
      console.log('logout');
    };

    if ('href' in rest && typeof rest.href === 'string') {
      return (
        <Link {...rest} href={rest.href}>
          <DropdownMenuItem>
            {label}
            <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      );
    }
    // logout
    return (
      <DropdownMenuItem {...rest} onClick={handleLogout}>
        {label}
        <DropdownMenuShortcut>{shortcut}</DropdownMenuShortcut>
      </DropdownMenuItem>
    );
  }
);

UserDropdownMenuItem.displayName = 'UserDropdownMenuItem';

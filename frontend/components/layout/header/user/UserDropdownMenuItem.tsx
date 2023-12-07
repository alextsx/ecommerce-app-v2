'use client';

import { memo } from 'react';
import Link from 'next/link';
import { DropdownMenuItem, DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { useHandleLogout } from '@/hooks/useHandleLogout';

type UserDropdownMenuItemProps = {
  label: string;
  shortcut: string;
};

export const UserDropdownMenuItem = memo(
  ({ label, shortcut, ...rest }: UserDropdownMenuItemProps) => {
    const { handleLogout } = useHandleLogout();

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

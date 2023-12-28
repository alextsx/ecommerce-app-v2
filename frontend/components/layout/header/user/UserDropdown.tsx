'use client';

import { useSelector } from 'react-redux';
import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchAndSetUser } from '@/hooks/useFetchAndSetUser';
import { selectAccessToken, selectRole } from '@/redux/auth/auth.slice';
import { UserDropdownBtn } from './UserDropdownBtn';
import { UserDropdownContent } from './UserDropdownContent';
import { UserDropdownHeaderGuest } from './UserDropdownHeaderGuest';
import { UserDropdownHeaderUser } from './UserDropdownHeaderUser';

const labelGroupsUser = [
  [
    {
      label: 'Profile',
      shortcut: '⇧⌘P',
      href: '/profile'
    },
    {
      label: 'Order history',
      shortcut: '⇧⌘O',
      href: '/order-history'
    }
  ],
  [
    //logout
    {
      label: 'Log out',
      shortcut: '⇧⌘Q'
    }
  ]
];

const labelGroupsAdmin = [
  [
    {
      label: 'Profile',
      shortcut: '⇧⌘P',
      href: '/profile'
    },
    {
      label: 'Admin panel',
      shortcut: '⇧⌘A',
      href: '/admin'
    },
    {
      label: 'Order history',
      shortcut: '⇧⌘O',
      href: '/order-history'
    }
  ],
  [
    //logout
    {
      label: 'Log out',
      shortcut: '⇧⌘Q'
    }
  ]
];

const labelGroupsGuest = [
  [
    {
      label: 'Login',
      shortcut: '⇧⌘I',
      href: '/login'
    }
  ],
  [
    {
      label: 'Register',
      shortcut: '⇧⌘U',
      href: '/registration'
    }
  ]
];

export function UserDropdown() {
  const { isLoading } = useFetchAndSetUser();

  const accessToken = useSelector(selectAccessToken);
  const userRole = useSelector(selectRole);
  const isLoggedIn = Boolean(accessToken);
  const isAdmin = userRole?.toLowerCase() === 'admin';

  return isLoading ? (
    <Skeleton className="h-8 w-8 rounded-full" />
  ) : (
    <DropdownMenu>
      <UserDropdownBtn />
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {isLoggedIn ? (
          <>
            <UserDropdownHeaderUser />
            {isAdmin ? (
              <UserDropdownContent labelGroups={labelGroupsAdmin} />
            ) : (
              <UserDropdownContent labelGroups={labelGroupsUser} />
            )}
          </>
        ) : (
          <>
            <UserDropdownHeaderGuest />
            <UserDropdownContent labelGroups={labelGroupsGuest} />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

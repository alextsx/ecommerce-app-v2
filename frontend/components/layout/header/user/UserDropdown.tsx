import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu';
import { UserDropdownBtn } from './UserDropdownBtn';
import { UserDropdownContent } from './UserDropdownContent';
import { UserDropdownHeader } from './UserDropdownHeader';

const labelGroups = [
  [
    {
      label: 'Profile',
      shortcut: '⇧⌘P',
      href: '/profile'
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

export function UserDropdown() {
  return (
    <DropdownMenu>
      <UserDropdownBtn />
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <UserDropdownHeader />
        <UserDropdownContent labelGroups={labelGroups} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

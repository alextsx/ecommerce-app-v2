import { Fragment, memo } from 'react';
import { DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserDropdownMenuItem } from './UserDropdownMenuItem';

type LabelGroups = {
  label: string;
  shortcut: string;
  href?: string;
}[];

type UserDropDownContentProps = {
  labelGroups: LabelGroups[];
};

export const UserDropdownContent = memo(({ labelGroups }: UserDropDownContentProps) =>
  labelGroups.map((group, index) => (
    <Fragment key={index}>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {group.map((labelElement, index) => (
          <UserDropdownMenuItem key={index} {...labelElement} />
        ))}
      </DropdownMenuGroup>
    </Fragment>
  ))
);

UserDropdownContent.displayName = 'UserDropdownContent';

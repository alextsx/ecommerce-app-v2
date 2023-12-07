'use client';

import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { selectAccessToken } from '@/redux/auth/auth.slice';
import { selectNameInitials } from '@/redux/user-details/user-details.slice';

export const UserDropdownBtn = () => {
  const name_initials = useSelector(selectNameInitials);
  const accessToken = useSelector(selectAccessToken);

  return (
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-10 w-10 p-1 rounded-full">
        {!accessToken ? (
          <FaUserCircle className="h-10 w-10 text-muted-foreground" />
        ) : (
          <Avatar className="h-10 w-10">
            <AvatarImage src={''} alt="avatar" />
            <AvatarFallback>{name_initials}</AvatarFallback>
          </Avatar>
        )}
      </Button>
    </DropdownMenuTrigger>
  );
};

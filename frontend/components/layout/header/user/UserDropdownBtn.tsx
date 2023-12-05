'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchAndSetUser } from '@/hooks/useFetchAndSetUser';
import { useRememberMe } from '@/hooks/useRememberMe';

export const UserDropdownBtn = () => {
  const { getRememberMe } = useRememberMe();

  const { isLoading } = useFetchAndSetUser({
    skip: !getRememberMe()
  });

  return isLoading ? (
    <Skeleton className="h-8 w-8 rounded-full" />
  ) : (
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
        <Avatar className="h-10 w-10">
          <AvatarImage src={''} alt="avatar" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
  );
};

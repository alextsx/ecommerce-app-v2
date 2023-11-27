import { NavLinks } from './nav-links/NavLinks';
import { UserDropdown } from './user/UserDropdown';

export const Header = () => {
  return (
    <header className="px-10 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 m-0 items-center">
        <div className="ml-4 flex">
          <NavLinks />
        </div>
        <div className="flex flex-1 items-center justify-end">
          <UserDropdown />
        </div>
      </div>
    </header>
  );
};

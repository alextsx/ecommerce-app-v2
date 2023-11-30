import { NavLink } from './NavLink';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export const NavLinks = () => {
  return (
    <nav className="flex items-center space-x-10 text-md font-medium">
      {links.map((link, index) => (
        <NavLink key={index} {...link} />
      ))}
    </nav>
  );
};

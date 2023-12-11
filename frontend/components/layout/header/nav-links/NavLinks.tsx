import { CategoryLinks } from './CategoryLinks';
import { NavLink } from './NavLink';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
];

export const NavLinks = () => {
  return (
    <nav className="flex items-center space-x-10 text-md font-medium">
      <NavLink label={links[0].label} href={links[0].href} />
      <CategoryLinks />
      {links.slice(1, 4).map((link, index) => (
        <NavLink key={index} {...link} />
      ))}
    </nav>
  );
};

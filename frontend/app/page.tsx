import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.'
};

export default function Homepage() {
  return <main className="w-full">Homepage</main>;
}

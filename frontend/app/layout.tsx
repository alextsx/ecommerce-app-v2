import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/shadcn-utils';
import { ReduxProvider } from '@/providers/ReduxProvider';

import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ecommerce application',
  description: 'Ecommerce application made with Next.js and TailwindCSS'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen  bg-background antialiased flex flex-col', inter.className)}
      >
        <ReduxProvider>
          <Header />
          <main className="flex flex-1 bg-secondary justify-center items-center flex-col w-full py-10">
            {children}
          </main>
        </ReduxProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}

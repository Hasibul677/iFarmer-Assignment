import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ReduxProvider from '@/providers/ReduxProvider';
import './globals.css';
import Navbar from '@/components/common/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js Assignments',
  description: 'Tic-Tac-Toe Game and CRUD Product App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen bg-gray-50 text-black">
            <Navbar />
            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
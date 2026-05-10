import './globals.css';
import { Inter } from 'next/font/google';
import { DataProvider } from '@/context/DataContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dashboard Kerja Sama KKP',
  description: 'Database Status Kerja Sama Kementerian Kelautan dan Perikanan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <DataProvider>
          <Toaster position="top-right" />
          <div id="toast-container"></div>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}

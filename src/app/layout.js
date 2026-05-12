import './globals.css';
import { DataProvider } from '@/context/DataContext';
import { Toaster } from 'react-hot-toast';

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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <DataProvider>
          <Toaster position="top-right" />
          <div id="toast-container"></div>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}

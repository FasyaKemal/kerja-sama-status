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

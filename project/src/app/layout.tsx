import './globals.css';
import ReactQueryProvider from '../ReactQueryProvider';
import AuthProvider from './context/AuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='fr'>
      <body>
        <AuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

export const metadata = {
  icons: {
    icon: '/rescuequiz.svg',
  },
};

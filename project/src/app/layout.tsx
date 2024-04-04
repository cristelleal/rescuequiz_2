import './globals.css';
import ReactQueryProvider from '../reactQueryProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ffr'>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}

export const metadata = {
  icons: {
    icon: '/rescuequiz.svg',
  },
};

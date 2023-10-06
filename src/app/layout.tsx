import { DM_Sans } from 'next/font/google';
import RootProvider from './provider/RootProvider';

const dmSans = DM_Sans({
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  subsets: ['latin'],
});

export const metadata = {
  title: 'FrontEnd-Next JS  ',
  description: 'Dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.className}>
      <body className={dmSans.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

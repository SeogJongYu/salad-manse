import { Geist, Geist_Mono } from 'next/font/google';

import { PreferenceStoreProvider } from '@/features/preference/providers/PreferenceStoreProvider';
import { Toaster } from '@/shared/components/ui/Sonner';
import { ReactScan } from '@/shared/modules/ReactScan';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <ReactScan />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PreferenceStoreProvider>{children}</PreferenceStoreProvider>
        <Toaster />
      </body>
    </html>
  );
}

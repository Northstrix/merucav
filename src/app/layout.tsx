import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/contexts/language-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Merucav',
  description: 'A modern digital design tool.',
  icons: {
    icon: [
      {
        rel: 'icon',
        url: '/logo.webp',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&family=Roboto:wght@100;300;400;500;700;900&family=Montserrat:wght@100..900&family=Figtree:wght@300..900&family=Merriweather:wght@300;400;700;900&family=Fraunces:opsz,wght@9..144,100..900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Roboto+Mono:wght@100..700&display=swap" rel="stylesheet" />
      </head>
      <body className="dark font-body antialiased">
        <LanguageProvider>
            {children}
            <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}

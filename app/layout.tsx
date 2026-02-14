import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Payday | Credit-First Financial Access for Everyday Workers',
  description: 'Payday helps domestic and on-demand workers access fair, wage-linked credit with consent-led underwriting and transparent servicing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable}`}>
        {children}
      </body>
    </html>
  );
}

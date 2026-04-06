import type { Metadata } from 'next';
import { DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Payday | Salary Advances for Domestic Workers',
  description: 'Domestic workers across India can access salary advances on a WhatsApp-based journey, underwritten through their work data.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${dmSerif.variable}`}>
        {children}
      </body>
    </html>
  );
}

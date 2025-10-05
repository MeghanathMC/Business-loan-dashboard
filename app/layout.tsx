import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { SettingsProvider } from '@/lib/settings-context';
import { Footer } from '@/components/footer';
import { GradientBackground } from '@/components/ui/gradient-background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Business Loan Dashboard - Bank Analyst Portal',
  description: 'Advanced loan analysis dashboard for business loan assessment and eligibility evaluation',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SettingsProvider>
          <GradientBackground>
            <div className="flex-1">
              {children}
            </div>
            <Toaster />
            <Footer />
          </GradientBackground>
        </SettingsProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import theme from './theme';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "News-V app",
  description: "Wewsletter with all the hot news for you",
  openGraph: {
    title: 'News-V',
    description: 'news for you where you can find what you need',
    type: 'article'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <main >
              {children}
            </main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

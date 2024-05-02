'use client';

import { ArticleProvider } from './Articles';

export function Providers({ children }: {
  children: React.ReactNode
}) {
  return (
    <ArticleProvider>{children}</ArticleProvider>
  );
}
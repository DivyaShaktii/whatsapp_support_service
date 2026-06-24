import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Customer Support Platform',
  description: 'Deploy your first AI customer support agent in under 10 minutes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

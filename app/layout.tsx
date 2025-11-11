import type { Metadata } from 'next';
import { Inter, Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

// Fontes modernas 2025
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Plataforma de Networking | Gestão Profissional',
  description: 'Sistema de gestão para grupos de networking focados em geração de negócios. Design moderno e profissional.',
  keywords: ['networking', 'gestão', 'negócios', 'indicações', 'B2B'],
  authors: [{ name: 'Your Company' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#FF5722',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="pt-BR" 
      className={`${inter.variable} ${outfit.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-body antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}



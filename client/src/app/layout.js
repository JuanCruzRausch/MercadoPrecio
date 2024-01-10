import { Inter } from 'next/font/google';
import { Providers } from '@/redux/providers';
import './globals.css';
import Navbar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mercado Precio',
  description: 'Mercado Precio game',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

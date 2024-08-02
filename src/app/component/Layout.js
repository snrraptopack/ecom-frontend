import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>E-commerce Store</title>
      </Head>

      <header className="bg-blue-600 text-white shadow-md">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <span className="text-2xl font-bold">E-commerce Store</span>
            </Link>
            <div className="flex items-center">
              <Link href="/" className="mx-4 hover:text-blue-200">Home</Link>
              <Link href="/search" className="mx-4 hover:text-blue-200">Search</Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8 flex-grow">
        {children}
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-3 text-center">
          <p>&copy; 2024 E-commerce Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

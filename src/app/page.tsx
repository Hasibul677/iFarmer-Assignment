import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Next.js Assignments</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <Link
          href="/assignment-1"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
        >
          Assignment-1: Tic-Tac-Toe Game
        </Link>
        <Link
          href="/assignment-2"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
        >
          Assignment-2: CRUD Product App
        </Link>
      </div>
    </main>
  );
}
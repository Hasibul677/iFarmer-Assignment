import Link from 'next/link';
import { Gamepad, PackageCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br text-black">
      <div className="flex flex-col md:flex-row gap-8">
        <Link
          href="/assignment-1"
          className="group shadow-md flex items-center gap-4 px-8 py-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-all duration-300 hover:bg-white/20"
        >
          <Gamepad className="w-8 h-8 text-yellow-300 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-semibold">Tic-Tac-Toe Game</span>
        </Link>

        <Link
          href="/assignment-2"
          className="group shadow-md flex items-center gap-4 px-8 py-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-all duration-300 hover:bg-white/20"
        >
          <PackageCheck className="w-8 h-8 text-green-300 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-semibold">CRUD Product App</span>
        </Link>
      </div>
    </main>
  );
}

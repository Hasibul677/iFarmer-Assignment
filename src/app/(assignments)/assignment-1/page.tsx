import Link from 'next/link';

export default function Assignment1() {
  return (
    <div className='mt-5'>
      <h1 className="text-2xl font-bold text-black mb-6 text-center">Tic-Tac-Toe Game</h1>
      <div className="flex items-center justify-center space-x-4">
        <Link
          href="/assignment-1/player-setup"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start New Game
        </Link>
        <Link
          href="/assignment-1/leaderboard"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
}
import LeaderboardTable from '@/components/assignment-1/LeaderboardTable';
import Link from 'next/link';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      <LeaderboardTable />
      <div className="mt-6 text-center">
        <Link
          href="/assignment-1"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Game
        </Link>
      </div>
    </div>
  );
}
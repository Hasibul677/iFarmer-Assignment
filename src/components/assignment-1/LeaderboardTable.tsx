'use client';

import { useAppSelector } from '@/lib/store';

export default function LeaderboardTable() {
  const { players } = useAppSelector((state) => state.ticTacToe);
  const totalScore = players.reduce((accumulator, currentObject) => {
    return accumulator + currentObject.score;
  }, 0);

  return (
    <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-100">
      <table className="min-w-full bg-white divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-indigo-600 to-purple-700">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
              Player
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
              Win
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
              Lost
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
              Draw
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
              Score
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {players.map((player, index) => (
            <tr
              key={player.id}
              className={`transition-all duration-150 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    {player.name && <div className="text-sm font-medium text-gray-900">
                      {player.name} <span className='rounded-full bg-purple-300 py-1 px-2'>{player.symbol}</span>
                    </div>}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-300`}>
                  {player.score}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-gradient-to-r bg-red-300`}>
                  {player.score ? 5 - (player.score + 5 - totalScore) : 0}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-gradient-to-r bg-red-300`}>
                  {5 - totalScore}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-purple-400`}>
                  {player.point}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
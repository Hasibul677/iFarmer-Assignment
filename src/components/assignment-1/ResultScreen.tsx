'use client';

import { useAppSelector, useAppDispatch } from '@/lib/store';
import { resetGame } from '@/features/ticTacToe/ticTacToeSlice';
import { useRouter } from 'next/navigation';


export default function ResultScreen() {
  const { players, roundWinners } = useAppSelector((state) => state.ticTacToe);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const winner = players[0].point > players[1].point
    ? players[0]
    : players[1].point > players[0].point
      ? players[1]
      : null;

  const handleNewGame = () => {
    dispatch(resetGame());
    router.push('/assignment-1/player-setup');
  };

  const handleLeaderboard = () => {
    router.push('/assignment-1/leaderboard');
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-800">Game Results</h2>

  
      <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Final Scores</h3>
        <ul className="space-y-3">
          {players.map((player) => {

            return (
              <li key={player.id} className="flex justify-between items-center">
                <span className="text-lg text-gray-600">{player.name}</span>
                <span className={`px-4 py-1 rounded-full font-bold 'bg-indigo-100 text-indigo-800'`}>
                  {player.point} points
                </span>
              </li>
            );
          })}
        </ul>
      </div>

    
      <div className={`mb-8 p-5 rounded-xl shadow-md text-center ${winner ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-amber-400 to-amber-500'
        }`}>
        <h3 className="text-2xl font-bold text-white">
          {winner
            ? `${winner.name} wins with ${winner.point} points! 🏆`
            : "It's a draw! 🤝"}
        </h3>
      </div>


      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Round Results</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {roundWinners.map((roundWinner, index) => {
            const roundPlayer = roundWinner ? players.find(p => p.symbol === roundWinner) : null;
            const isUltimateWinner = winner === roundWinner;

            return (
              <div
                key={index}
                className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border ${isUltimateWinner ? 'border-amber-400' : 'border-gray-100'
                  }`}
              >
                <p className="font-bold text-indigo-600 text-center mb-1">Round {index + 1}</p>
                <div className="flex flex-col items-center">
                  {roundPlayer ? (
                    <>
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-1 ${isUltimateWinner
                          ? 'bg-gradient-to-br from-yellow-200 to-amber-300'
                          : 'bg-indigo-100'
                        }`}>
                        <span className="text-indigo-600 font-medium">
                          {roundPlayer.symbol}
                        </span>
                      </div>
                      <p className={`text-sm font-medium text-center ${isUltimateWinner ? 'text-amber-700' : 'text-gray-700'
                        }`}>
                        {roundPlayer.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 flex items-center justify-center bg-amber-100 rounded-full mb-1">
                        <span className="text-amber-600 font-medium">=</span>
                      </div>
                      <p className="text-sm font-medium text-gray-700">Draw</p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>


      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleNewGame}
          className="flex-1 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          Start New Game
        </button>
        <button
          onClick={handleLeaderboard}
          className="flex-1 px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          View Leaderboard
        </button>
      </div>
    </div>
  );
}
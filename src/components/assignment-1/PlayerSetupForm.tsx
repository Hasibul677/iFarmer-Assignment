'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/lib/store';
import { setPlayers } from '@/features/ticTacToe/ticTacToeSlice';
import { useRouter } from 'next/navigation';

export default function PlayerSetupForm() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setPlayers({ player1, player2 }));
    router.push('/assignment-1/game');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl text-black font-bold mb-6 text-center">Player Setup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="player1" className="block text-sm font-medium text-gray-700">
            Player 1 (X)
          </label>
          <input
            type="text"
            id="player1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="player2" className="block text-sm font-medium text-gray-700">
            Player 2 (O)
          </label>
          <input
            type="text"
            id="player2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-black  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={!player1 || !player2}
          className={`w-full px-4 py-2 text-white rounded-md ${!player1 || !player2 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Start Game
        </button>
      </form>
    </div>
  );
}
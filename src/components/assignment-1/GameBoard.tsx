'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import { makeMove, resetBoard, nextRound } from '@/features/ticTacToe/ticTacToeSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GameBoard() {
  const {
    board,
    currentPlayer,
    players,
    round,
    roundWinners,
    gameStatus
  } = useAppSelector((state) => state.ticTacToe);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const currentPlayerName = players.find(p => p.symbol === currentPlayer)?.name;

  const handleCellClick = (index: number) => {
    if (gameStatus === 'playing') {
      dispatch(makeMove(index));
    }
  };

  const handleResetBoard = () => {
    dispatch(resetBoard());
  };

  const handleNextRound = () => {
    dispatch(nextRound());
  };

  const handleEndGame = () => {
    router.push('/assignment-1/result');
  };

  useEffect(() => {
    if (gameStatus === "game-over") {
       router.push('/assignment-1/result');
    }
  }, [gameStatus, router])


  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center">Round {round} of 5</h2>
        <div className="flex justify-between mt-4">
          <div className="text-center">
            <p className="font-semibold">{players[0].name}</p>
            <p>Point: {players[0].point}</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{players[1].name}</p>
            <p>Point: {players[1].point}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-center font-medium">
          Current Turn: <span className="font-bold">{currentPlayerName}</span> ({currentPlayer})
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            className="w-full h-24 bg-gray-100 flex items-center justify-center text-4xl font-bold rounded-md hover:bg-gray-200 transition-colors"
            disabled={!!cell || gameStatus !== 'playing'}
          >
            {cell}
          </button>
        ))}
      </div>

      {(gameStatus === 'round-over') && (
        <div className="mb-4 p-4 bg-yellow-100 rounded-md text-center">
          <p className="font-bold mb-2">
            {roundWinners[roundWinners.length - 1]
              ? `${players.find(p => p.symbol === roundWinners[roundWinners.length - 1])?.name} wins this round!`
              : "It's a draw!"}
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleNextRound}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Next Round
            </button>
            <button
              onClick={handleEndGame}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              End Game
            </button>
          </div>
        </div>
      )}

      <button
        onClick={handleResetBoard}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Reset Board
      </button>
    </div>
  );
}
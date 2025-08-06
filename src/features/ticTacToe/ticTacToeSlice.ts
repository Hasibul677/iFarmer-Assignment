import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from './types';

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  players: [
    { id: '1', name: '', symbol: 'X', score: 0, point: 0 },
    { id: '2', name: '', symbol: 'O', score: 0 , point: 0},
  ],
  round: 1,
  roundWinners: [],
  gameStatus: 'setup',
};

const ticTacToeSlice = createSlice({
  name: 'ticTacToe',
  initialState,
  reducers: {
    setPlayers: (state, action: PayloadAction<{ player1: string; player2: string }>) => {
      state.players[0].name = action.payload.player1;
      state.players[1].name = action.payload.player2;
      state.gameStatus = 'playing';
    },
makeMove: (state, action: PayloadAction<number>) => {
  const index = action.payload;

  if (state.board[index] !== null || state.gameStatus !== 'playing') {
    return;
  }

  const currentPlayerAtMove = state.currentPlayer;

  state.board = state.board.map((cell, i) =>
    i === index ? currentPlayerAtMove : cell
  );

  if (checkWin(state.board)) {

    state.players = state.players.map(player => ({
      ...player,
      score: player.symbol === currentPlayerAtMove
        ? player.score + 1
        : player.score,
      point: player.symbol === currentPlayerAtMove
        ? player.point + 2
        : player.point + 1,
    }));

    state.roundWinners.push(currentPlayerAtMove);

    const anyPlayerHas3OrMore = state.players.some(p => p.score >= 3);

    if (state.round === 5 || anyPlayerHas3OrMore) {
      state.gameStatus = 'game-over';
    } else {
      state.gameStatus = 'round-over';
    }

    return;
  }

  if (checkDraw(state.board)) {
    state.roundWinners.push(null);

    if (state.round === 5) {
      state.gameStatus = 'game-over';
    } else {
      state.gameStatus = 'round-over';
    }

    return;
  }

  // Switch turn
  state.currentPlayer = currentPlayerAtMove === 'X' ? 'O' : 'X';
},


    nextRound: (state) => {
      state.round += 1;
      state.board = Array(9).fill(null);
      state.currentPlayer = state.round % 2 === 1 ? 'X' : 'O';
      state.gameStatus = 'playing';
    },
    resetGame: () => {
      return initialState;
    },
    resetBoard: (state) => {
      state.board = Array(9).fill(null);
      state.currentPlayer = state.round % 2 === 1 ? 'X' : 'X';
      state.gameStatus = 'playing';
    },
  },
});

function checkWin(board: (string | null)[]): boolean {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function checkDraw(board: (string | null)[]): boolean {
  return board.every(cell => cell !== null);
}

export const { setPlayers, makeMove, nextRound, resetGame, resetBoard } = ticTacToeSlice.actions;
export default ticTacToeSlice.reducer;
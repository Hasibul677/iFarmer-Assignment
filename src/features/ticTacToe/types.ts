export type Player = {
  id: string;
  name: string;
  symbol: 'X' | 'O';
  score: number;
  point: number;
};

export type GameState = {
  board: (string | null)[];
  currentPlayer: 'X' | 'O';
  players: Player[];
  round: number;
  roundWinners: (string | null)[];
  gameStatus: 'setup' | 'playing' | 'round-over' | 'game-over';
};
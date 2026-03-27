import { Chess } from 'chess.js';

class GameManager {
    private game: Chess;

    constructor() {
        this.game = new Chess();
    }

    public makeMove(move: string): boolean {
        const result = this.game.move(move);
        return result !== null;
    }

    public validateMove(move: string): boolean {
        return this.game.validateMove(move);
    }

    public getBoardState(): string { 
        return this.game.fen();
    }

    public getGameStatus(): string {
        if (this.game.in_checkmate()) {
            return 'Checkmate';
        } else if (this.game.in_stalemate()) {
            return 'Stalemate';
        } else if (this.game.in_draw()) {
            return 'Draw';
        } else if (this.game.in_check()) {
            return 'Check';
        }
        return 'Ongoing';
    }
}

export default GameManager;
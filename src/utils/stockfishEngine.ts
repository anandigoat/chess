// Stockfish Engine Integration
// This module integrates the Stockfish chess engine for bot moves and analysis

let stockfishWorker: Worker | null = null;

export class StockfishEngine {
  private worker: Worker;
  private bestMove: string = '';
  private isReady: boolean = false;

  constructor() {
    // Load Stockfish from CDN
    this.worker = new Worker('https://cdn.jsdelivr.net/npm/stockfish@10.0.2/stockfish.js');
    
    this.worker.onmessage = (event) => {
      const message = event.data;
      
      if (message === 'uciok') {
        this.isReady = true;
      }
      
      if (message.startsWith('bestmove')) {
        const parts = message.split(' ');
        this.bestMove = parts[1];
      }
    };

    this.worker.postMessage('uci');
  }

  /**
   * Set engine difficulty level (0-20)
   */
  setDifficulty(level: number): void {
    const skillLevel = Math.max(0, Math.min(20, level));
    this.worker.postMessage(`setoption name Skill Level value ${skillLevel}`);
  }

  /**
   * Analyze a position and get the best move
   * @param fen - The FEN string of the position
   * @param depth - Search depth (1-20, higher = stronger)
   * @returns Promise with the best move
   */
  async getBestMove(fen: string, depth: number = 15): Promise<string> {
    return new Promise((resolve) => {
      this.bestMove = '';
      
      this.worker.onmessage = (event) => {
        const message = event.data;
        if (message.startsWith('bestmove')) {
          const parts = message.split(' ');
          resolve(parts[1]);
        }
      };

      this.worker.postMessage('ucinewgame');
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage(`go depth ${depth}`);
    });
  }

  /**
   * Get position evaluation
   * @param fen - The FEN string of the position
   * @returns Promise with evaluation in centipawns
   */
  async evaluatePosition(fen: string): Promise<number> {
    return new Promise((resolve) => {
      let evaluation = 0;
      
      this.worker.onmessage = (event) => {
        const message = event.data;
        
        if (message.includes('info') && message.includes('cp')) {
          const cpMatch = message.match(/cp\s+(-?\d+)/);
          if (cpMatch) {
            evaluation = parseInt(cpMatch[1]);
          }
        }
        
        if (message.startsWith('bestmove')) {
          resolve(evaluation);
        }
      };

      this.worker.postMessage('ucinewgame');
      this.worker.postMessage(`position fen ${fen}`);
      this.worker.postMessage('go depth 12');
    });
  }

  /**
   * Terminate the worker
   */
  destroy(): void {
    this.worker.terminate();
  }
}

export default StockfishEngine;
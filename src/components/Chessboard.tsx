import React, { useState } from 'react';

const Chessboard = ({ onSquareClick, legalMoves, selectedSquare }) => {
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const rows = [8, 7, 6, 5, 4, 3, 2, 1];

    const renderSquare = (col, row) => {
        const isSelected = selectedSquare && selectedSquare.x === col && selectedSquare.y === row;
        const isLegalMove = legalMoves.some(move => move.x === col && move.y === row);
        const squareClass = `square ${isSelected ? 'selected' : ''} ${isLegalMove ? 'legal-move' : ''}`;

        return (
            <div 
                key={`${col}-${row}`} 
                className={squareClass} 
                onClick={() => onSquareClick(col, row)} 
            />
        );
    };

    return (
        <div className="chessboard">
            {columns.map(col => (
                <div key={col} className="column">
                    {rows.map(row => renderSquare(col, row))}
                </div>
            ))}
        </div>
    );
};

export default Chessboard;

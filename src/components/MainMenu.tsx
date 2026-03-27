import React from 'react';

const MainMenu = () => {
    return (
        <div className="main-menu">
            <h1>Choose an Option</h1>
            <ul>
                <li><button>Play vs Friend</button></li>
                <li><button>Play vs Bot</button></li>
                <li><button>Puzzles</button></li>
            </ul>
        </div>
    );
};

export default MainMenu;

import React from 'react';

const MainMenu = () => {
    const navigateTo = (page: string) => {
        // handle state management for navigation here
    };

    return (
        <div>
            <button onClick={() => navigateTo('playFriend')}>Play vs Friend</button>
            <button onClick={() => navigateTo('playBot')}>Play vs Bot with 10 difficulty levels</button>
            <button onClick={() => navigateTo('puzzles')}>Puzzles</button>
        </div>
    );
};

export default MainMenu;

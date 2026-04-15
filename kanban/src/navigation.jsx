import { useState } from 'react';

function Navigation({ menuItems = [], onSelectBoard, onCreateBoard }) {
    const [activeBoard, setActiveBoard] = useState(null);
    const [showInput, setShowInput] = useState(false);
    const [newBoardName, setNewBoardName] = useState('');

    const handleClick = (board) => {
        setActiveBoard(board);
        onSelectBoard(board);
    };

    const handleAddBoard = () => {
        if (!newBoardName.trim()) return;

        const newBoard = {
            name: newBoardName
        };

        onCreateBoard(newBoard);

        setNewBoardName('');
        setShowInput(false);
    };

    return (
        <nav >
            <ul className="list-group list-unstyled">
                {menuItems.map((board) => (
                    <li
                        key={board.name}
                        style={{ cursor: "pointer" }}
                        className="p-2 myhover text-gray icon-board"
                        onClick={() => handleClick(board)}
                    >
                        {board.name}
                    </li>
                ))}

                <li
                    style={{ color: "#605D97", cursor: "pointer" }}
                    className="p-2"
                    onClick={() => setShowInput(true)}
                >
                    create new board
                </li>

                {showInput && (
                    <li className="p-2">
                        <input
                            type="text"
                            value={newBoardName}
                            onChange={(e) => setNewBoardName(e.target.value)}
                            placeholder="Board name..."
                        />
                        <button onClick={handleAddBoard}>Add</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navigation;
import { useEffect, useState } from 'react'


function Navigation({menuItems=[],onSelectBoard}) {
    const [activeBoard, setActiveBoard] = useState(null);
    const handleClick = (board) => {
        setActiveBoard(board);
        onSelectBoard(board); // 🔥 remonte vers App
    };
    return (
        <>
            <nav className="dark-mode">
                <ul className="list-group list-unstyled">
                    {menuItems.map((board) => (
                        <li key={board.name} style={{cursor:"pointer"}}  className="p-2 myhover text-gray icon-board"  onClick={() => handleClick(board)}>

                            {board.name}
                        </li>
                    ))}
                    <li style={{color:"#605D97",cursor:"pointer"}} className="p-2" >
                        create new board
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navigation;
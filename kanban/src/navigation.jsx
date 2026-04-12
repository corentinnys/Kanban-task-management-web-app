import { useEffect, useState } from 'react'


function Navigation({menuItems=[]}) {


    return (
        <>
            <nav className="dark-mode">
                <ul className="list-group list-unstyled">
                    {menuItems.map((board) => (
                        <li key={board.name}  className="p-2 myhover text-gray icon-board">

                            {board.name}
                        </li>
                    ))}
                    <li style={{color:"#605D97"}}>
                        create new board
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navigation;
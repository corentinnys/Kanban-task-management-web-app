import { useEffect, useState } from 'react'


function Navigation({menuItems=[]}) {


    return (
        <>
            {menuItems.map((board) => (
            <div key={board.name}>
                {board.name}
            </div>
            ))}
        </>
    );
}

export default Navigation;
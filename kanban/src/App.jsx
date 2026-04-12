import { useEffect, useState } from 'react'
import './App.css'
import Navigation from "./navigation.jsx";

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                console.log(items);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <Navigation menuItems={items.boards} />
           {/* {items.map((board) => (
                <div key={board.name}>
                    {board.col.name}
                </div>
            ))}*/}
        </>
    );
}

export default App;
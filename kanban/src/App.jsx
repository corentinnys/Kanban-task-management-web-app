import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navigation from "./navigation.jsx";
import Kanban from "./kanban.jsx";


function App() {
    const [items, setItems] = useState([]);

    const [activeBoard, setActiveBoard] = useState(null);

    const handleCreateBoard = (newBoard) => {
        const boardWithId = {
            ...newBoard,
            id: crypto.randomUUID()
        };

        setItems((prev) => [...prev, boardWithId]);
    };
    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => {
                setItems(data.boards);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                   <div className="col-md-4">
                       <Navigation menuItems={items}  onSelectBoard={setActiveBoard}  onCreateBoard={handleCreateBoard} />
                   </div>
                    <div className="col-md-8">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>{activeBoard?.name}</h2>
                            <button className="btn btn-primary">Add new Task</button>
                        </div>
                        <Kanban board={activeBoard}/>
                    </div>
                </div>
            </div>

           {/* {items.map((board) => (
                <div key={board.name}>
                    {board.col.name}
                </div>
            ))}*/}
        </>
    );
}

export default App;
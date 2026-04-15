import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Navigation from "./navigation.jsx";
import Kanban from "./kanban.jsx";


function App() {
    const [items, setItems] = useState([]);

    const [activeBoard, setActiveBoard] = useState(null);
    const [show, setShow] = useState(false);
    const [current, setCurrent] = useState(null);
    const [showSidebar, setShowSidebar] = useState(true);


    const handleCreateBoard = (newBoard) => {
        const boardWithId = {
            ...newBoard,
            id: crypto.randomUUID()
        };

        setItems((prev) => [...prev, boardWithId]);
    };


    const handleShowSidebar = () => {

       setShowSidebar(!showSidebar);
    }
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const el = document.getElementById('containerPrincipal');
        const kanban = document.getElementById('kanban');
        if (!el) return;

        el.classList.toggle("dark-mode", darkMode);
        el.classList.toggle("light-mode", !darkMode);
        kanban.classList.toggle("dark-mode", darkMode);
        kanban.classList.toggle("light-mode", !darkMode);
    }, [darkMode]);

    useEffect(() => {
        fetch("/data.json")
            .then((res) => res.json())
            .then((data) => {
                setItems(data.boards);
                if (data.boards.length > 0) {
                    setActiveBoard(data.boards[0]);
                }
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            <div className="container-fluid vh-100s" id="containerPrincipal">
                <div className="row vh-100">

                    <div className="col-md-4 h-100 d-flex flex-column">
                        <Navigation
                            menuItems={items}
                            onSelectBoard={setActiveBoard}
                            onCreateBoard={handleCreateBoard}
                        />

                        <div className="form-check form-switch d-flex align-items-center gap-2 mt-auto">
                            <img src="/assets/icon-light-theme.svg" alt="light" />

                            <input
                                className="form-check-input m-0"
                                type="checkbox"
                                id="flexSwitchCheckDefault"
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                            />

                            <img src="/assets/icon-dark-theme.svg" alt="dark" />
                        </div>
                    </div>

                  {/*  <div className="col-md-8 h-100" style={{background: "#21212D"}}>*/}
                    <div className="col-md-8 h-100 dark-mode" id="kanban">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>{activeBoard?.name}</h2>
                            <button className="btn btn-primary">Add new Task</button>
                        </div>
                        <Kanban board={activeBoard}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
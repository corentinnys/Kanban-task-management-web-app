import { useState } from "react";
import Task from "./task.jsx";

function Kanban({ board }) {
    const [show, setShow] = useState(false);
    const [current, setCurrent] = useState(null);
    const [localTasks, setLocalTasks] = useState([]);

    const handleClick = (task) => {
        setCurrent(task);
        setLocalTasks([...task.subtasks]); // ✅ copie propre
        setShow(true);
    };

    const toggleSubtask = (index) => {
        setLocalTasks((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                isCompleted: !updated[index].isCompleted
            };
            return updated;
        });
    };

    const closeModal = () => {
        setShow(false);
        setCurrent(null);
        setLocalTasks([]);
    };

    return (
        <>
            {/* BOARD */}
            <div className="d-flex gap-3 overflow-auto position-relative">
                {board?.columns.map((col) => (
                    <div
                        key={col.name}
                        className="d-flex flex-column p-2"
                        style={{
                            minWidth: "250px",
                            background: "#f4f5f7",
                            borderRadius: "8px"
                        }}
                    >
                        {/* HEADER */}
                        <div className="d-flex align-items-center mb-2">
                            <span
                                className="rounded-circle"
                                style={{
                                    height: "20px",
                                    width: "20px",
                                    background: "red",
                                    marginRight: "8px"
                                }}
                            ></span>

                            <div>
                                {col.name} ({col.tasks.length})
                            </div>
                        </div>

                        {/* TASKS */}
                        {col.tasks.map((task) => (
                            <Task
                                key={task.title}
                                task={task}
                                onClick={handleClick}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* MODAL */}
            {show && current && (
                <div
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        zIndex: 999
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            padding: "30px",
                            borderRadius: "10px",
                            background: "#2C2C38",
                            color: "white",
                            minWidth: "300px"
                        }}
                    >
                        <h2>{current.title}</h2>
                        <p>
                            {current.description || "pas de description"}
                        </p>

                        {/* SUBTASKS */}
                        {localTasks.map((subtask, index) => (
                            <div
                                key={subtask.title}
                                className="d-flex gap-2 align-items-center"
                                style={{ margin: "10px",background :"#21212D",padding:"10px" }}
                            >
                                <input
                                    type="checkbox"
                                    checked={subtask.isCompleted}
                                    onChange={() => toggleSubtask(index)}
                                />
                                <span
                                    style={{
                                        textDecoration: subtask.isCompleted
                                            ? "line-through"
                                            : "none",
                                        opacity: subtask.isCompleted ? 0.5 : 1,
                                        fontSize:'10px'
                                    }}
                                >
                                    {subtask.title}
                                </span>
                            </div>
                        ))}
                        <select className="form-select w-100">
                            <option value="home">Debug</option>
                            <option value="search">Don</option>
                            <option value="archive">Archive</option>
                        </select>
                        <button
                            onClick={closeModal}
                            style={{
                                marginTop: "10px",
                                padding: "5px 10px",
                                cursor: "pointer"
                            }}
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Kanban;
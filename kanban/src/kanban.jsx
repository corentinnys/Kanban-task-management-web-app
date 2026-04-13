import Task from "./task.jsx";

function Kanban({ board }) {
    return (
                <div className="d-flex gap-3 overflow-auto">
                    {board?.columns.map((col) => (
                        <div
                            key={col.name}
                            className="d-flex flex-column p-2"
                            style={{ minWidth: "250px", background: "#f4f5f7", borderRadius: "8px" }}
                        >
                            <div className="d-flex align-items-center mb-2">
                        <span
                            className="rounded-circle"
                            style={{
                                height: "20px",
                                width: "20px",
                                background: "red",
                                display: "block",
                                marginRight: "8px"
                            }}
                        ></span>
                                <div>{col.name}</div>
                            </div>

                            {col.tasks.map((task) => (
                                <Task key={task.title} task={task} />
                            ))}
                        </div>
                    ))}
                </div>
            );
        };

export default Kanban;
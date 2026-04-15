import { useEffect, useState } from 'react'
import './Task.css'
function Task({key,task,onClick}) {







    const completed = task.subtasks.filter(
        (subtask) => subtask.isCompleted
    ).length;


    return (
        <>

            <div className="task" style={{ fontSize: "10px", color: "white" }}
                 onClick={() => onClick(task)}>
                <div>{task.title}</div>

                <div className="subtask">
                      {completed}/{task.subtasks.length} subtasks
                </div>
            </div>


        </>
    );
}

export default Task;
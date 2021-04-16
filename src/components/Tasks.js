import Task from "./Task"

function Tasks({tasks, onDelete, onToggle}) {
    return (
        <>
            {tasks.map((task) => (
                <Task onToggle={onToggle} key={task.id} task={task} onDelete={onDelete} />
            ))}
        </>
    )
}

export default Tasks

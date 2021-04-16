import { useState } from "react"

function AddTask({onAdd}) {

    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!text) {
            alert('Add Text')
            return;
        }
        if(!day) {
            alert('Add Day')
            return;
        }
        onAdd ({text, day, reminder})
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time' onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Remider</label>
                <input type='checkbox' onChange={(e) => setReminder(e.currentTarget.checked)}  />
            </div>
            <input type='submit' className='btn btn-block' value='Save Task'/>
        </form>
    )
}

export default AddTask

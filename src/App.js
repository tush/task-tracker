import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false);


  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    }
    getTasks()
  }, [])

  const fetchTask = async (id) => {
    const rs = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await rs.json();
    return data;
  }

  const fetchTasks = async () => {
    const rs = await fetch('http://localhost:5000/tasks');
    const data = await rs.json();
    return data;
  }

  const [tasks, setTasks] = useState([])

  const addTask = async (task) => {
    const resp = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const newTask = await resp.json();
    setTasks([...tasks, newTask])
    // const id=Math.floor(Math.random()*1000)+1;
    // const newTask = {id, ...task};
    // setTasks([...tasks, newTask])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = async (id) => {

    const task = await fetchTask(id);
    const updatedTask = {...task, reminder: !task.reminder}

    const resp = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await resp.json();

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder}: task))
    // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder}: task))
  }

  return (
    <Router>
      <div className='container'>
        <Header showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)}/>
        
        
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}  />) : ('No task to show')}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

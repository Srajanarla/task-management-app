import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import './App.css';

const API_URL = 'https://670e175c073307b4ee456b4a.mockapi.io/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);



  
  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  return (
    <div className='container'>
      <h1>Task Management Application</h1>
      <TaskForm tasks={tasks} setTasks={setTasks} />
      <TaskFilter setFilter={setFilter} />
      <TaskList tasks={filteredTasks} setTasks={setTasks}/>
    </div>
  );
};

export default App;

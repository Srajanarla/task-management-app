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


  const addTask = async(title, description, status) => {
    const todoCount = tasks.filter(task => task.status === 'To Do').length;
    if (status === 'To Do' && todoCount >= tasks.length * 0.5) {
      alert("You can't add more 'To Do' tasks. 50% of tasks are already in 'To Do' status.");
      return;
    }
    try {
      const response = await axios.post(API_URL, {
        title,
        description,
        status
      });
      setTasks([...tasks, response.data]);
      console.log(tasks)
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

  return (
    <div className='container'>
      <h1>Task Management Application</h1>
      <TaskForm addTask={addTask} />
      <TaskFilter setFilter={setFilter} />
      <TaskList tasks={filteredTasks} setTasks={setTasks}/>
    </div>
  );
};

export default App;

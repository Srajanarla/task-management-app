import React, { useState, useEffect } from 'react';
import '../TaskForm/TaskForm.css';
import axios from 'axios';

const API_URL = 'https://670e175c073307b4ee456b4a.mockapi.io/tasks';

const TaskForm = ({tasks, setTasks}) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');


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
      setTasks(prevTasks => [...prevTasks, response.data]);
      console.log(tasks)
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please provide a title and description');
      return;
    }
      addTask(title, description, status);
      setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type='submit'>Add Task</button>
    </form>
  );
};

export default TaskForm;

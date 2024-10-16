import React from 'react';
import '../TaskFilter/TaskFilter.css';

const TaskFilter = ({ setFilter }) => {
  return (
    <div>
      <label>Filter tasks: </label>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
    </div>
  );
};

export default TaskFilter;

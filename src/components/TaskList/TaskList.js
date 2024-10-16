import React, { useState } from 'react';
import '../TaskList/TaskList.css';
import axios from 'axios';

const API_URL = 'https://670e175c073307b4ee456b4a.mockapi.io/tasks';

const TaskList = ({ tasks, setTasks }) => {

  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('');

  const handleEditSave = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        title: editTitle,
        description: editDescription,
        status: editStatus,
      });

      const updatedTasks = tasks.map(task =>
        task.id === id ? response.data : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    console.log("Deleting task with id:", id);
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                {editTaskId === task.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleEditSave(task.id)}>Save</button>
                      <button onClick={() => setEditTaskId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td>
                      <button style={{ marginRight: '20px', width: '75px' }} onClick={() => handleEditClick(task)}>Edit</button>
                      <button style={{ marginTop: '5px', width: '75px' }} onClick={() => handleDeleteTask(task.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskList;

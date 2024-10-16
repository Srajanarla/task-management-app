import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the additional matchers like 'toBeInTheDocument'
import TaskForm from './TaskForm';

describe('TaskForm Component', () => {
  test('renders form elements correctly', () => {
    render(<TaskForm addTask={jest.fn()} />);

    // Check if input fields and button are in the document
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // for the select dropdown
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('should update input fields on change', () => {
    render(<TaskForm addTask={jest.fn()} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const selectStatus = screen.getByRole('combobox');

    // Simulate user input in the form fields
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Task description' } });
    fireEvent.change(selectStatus, { target: { value: 'In Progress' } });

    expect(titleInput.value).toBe('New Task');
    expect(descriptionInput.value).toBe('Task description');
    expect(selectStatus.value).toBe('In Progress');
  });

  test('should call addTask with correct values when the form is submitted', () => {
    const mockAddTask = jest.fn();
    render(<TaskForm addTask={mockAddTask} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Description');
    const submitButton = screen.getByRole('button', { name: /add task/i });

    // Simulate filling out the form
    fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    
    // Simulate form submission
    fireEvent.click(submitButton);

    // Check if addTask was called with correct values
    expect(mockAddTask).toHaveBeenCalledWith('Test Task', 'Test Description', 'To Do');

    // Check if the inputs are reset after submitting the form
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  test('should show an alert if title or description is missing', () => {
    const mockAddTask = jest.fn();
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(); // Mock the alert function

    render(<TaskForm addTask={mockAddTask} />);

    const submitButton = screen.getByRole('button', { name: /add task/i });

    // Simulate form submission without filling the fields
    fireEvent.click(submitButton);

    // Expect alert to be called
    expect(alertMock).toHaveBeenCalledWith('Please provide a title and description');

    // Restore original alert implementation
    alertMock.mockRestore();
  });
});

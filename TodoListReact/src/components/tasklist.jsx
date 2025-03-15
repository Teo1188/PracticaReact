import { useState, useEffect } from 'react';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  // Cargar tareas desde localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Guardar tareas en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskText.trim()) {
      alert('Por favor ingrese una tarea');
      return;
    }
    setTasks([...tasks, { text: taskText, isCompleted: false }]);
    setTaskText('');
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    const newText = prompt('Editar tarea:', tasks[index].text);
    if (newText) {
      const newTasks = [...tasks];
      newTasks[index].text = newText;
      setTasks(newTasks);
    }
  };

  return (
    <div className="contenedor">
      <h1>Lista de Tareas</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Ingrese una tarea..."
      />
      <button onClick={addTask}>Añadir</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              onClick={() => toggleComplete(index)}
              className={task.isCompleted ? 'complete' : ''}
            >
              {task.text}
            </span>
            <div className="botones">
              <button className="edit" onClick={() => editTask(index)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteTask(index)}>
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
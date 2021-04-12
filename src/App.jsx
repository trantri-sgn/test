import { useState, useEffect } from "react";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTask();
  }, []);
  //fetch data tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5001/tasks");
    const data = await res.json();
    return data;
  };
  //fetch data task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5001/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5001/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const upTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(upTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              reminder: !data.reminder,
            }
          : task
      )
    );
  };
  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5001/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  return (
    <Router>
      <div className="container">
        <Header
          title="Task-Tracker"
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                <h3 style={{ color: "red" }}>No Task To Show</h3>
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;

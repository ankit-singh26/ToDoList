import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { BsEye, BsPencil, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

const Home = () => {
  const { userToken } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  });

  const handleToggleComplete = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task._id === taskId);
    const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ completed: updatedTask.completed }),
        }
      );

      if (!res.ok) throw new Error("Failed to update task");

      setTasks((prev) =>
        prev.map((t) =>
          t._id === taskId ? { ...t, completed: updatedTask.completed } : t
        )
      );
    } catch (error) {
      console.error("Toggle complete error:", error);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => setTasks(data))
        .catch((err) => console.error("Fetch error:", err));
    }
  }, [userToken]);

  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date).toISOString().split("T")[0];
    return taskDate === selectedDate;
  });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400 text-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to ToDo List</h1>
          <p className="text-lg mb-10 text-gray-800">
            Manage your tasks efficiently with our ToDo List app.
          </p>

          {!userToken ? (
            <p className="text-red-700 font-medium">
              Please log in to access your tasks.
            </p>
          ) : (
            <div className="text-left">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Your Tasks</h2>
                <div className="flex items-center bg-white rounded-xl shadow-md p-6">
                  <label htmlFor="date" className="text-lg font-medium mr-3 ">
                    Select Date:
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-0 text-black"
                  />
                </div>
              </div>

              {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
                  {filteredTasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg transition-transform hover:scale-[1.02] hover:shadow-lg border border-yellow-500 flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={task.completed || false}
                          onChange={() => handleToggleComplete(task._id)}
                          className="mt-1 h-5 w-5 text-yellow-600"
                        />
                        <div
                          className={`${
                            task.completed ? "line-through text-gray-400" : ""
                          }`}
                        >
                          <h3
                            className={`text-2xl font-semibold ${
                              task.completed
                                ? "line-through text-gray-400"
                                : "text-yellow-700"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <p className="text-gray-700 mt-2">
                            {task.description.length > 100
                              ? task.description.substring(0, 100) + "..."
                              : task.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end items-center mt-4 space-x-4 text-xl text-yellow-700">
                        <Link to={`/tasks/${task._id}`} title="View">
                          <BsEye className="hover:text-blue-600 cursor-pointer" />
                        </Link>
                        <Link to={`/tasks/edit/${task._id}`} title="Edit">
                          <BsPencil className="hover:text-green-600 cursor-pointer" />
                        </Link>
                        <button
                          onClick={() => handleDelete(task._id)}
                          title="Delete"
                        >
                          <BsTrash className="hover:text-red-600 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700 text-center">
                  No tasks found for selected date.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

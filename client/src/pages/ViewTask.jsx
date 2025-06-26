import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import { useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const ViewTask = () => {
  const { user, userToken } = useAuth();
  const { id } = useParams();
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`, {
          method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        }});
        const data = await response.json();
        setTask(data.title);
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };
    fetchTaskData();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-yellow-700 mb-4 border-b pb-2">Task Details</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Title:</h2>
            <p className="text-gray-700 text-lg">{task}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Description:</h2>
            <p className="text-gray-700 text-lg whitespace-pre-line">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTask;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    const success = await login(formData.email, formData.password); 
    if (success) {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Login failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-yellow-300 text-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-yellow-100 p-10 rounded-xl shadow-xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            Log In to Your Account
          </h2>
          <form onSubmit={handleLogin} className="mt-8 space-y-6" aria-label="Login form">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-600 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-400 placeholder-gray-600 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-medium text-blue-700 hover:text-blue-900 focus:outline-none underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

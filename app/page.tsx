"use client";

import { useState } from "react";
import { setToken, setUser, clearAuth } from "@/redux/auth/auth.slice";
import useAuthSession from "@/hooks/useAuthSession";
import { useAppDispatch } from "@/redux/store";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const user = useAuthSession();

  const handleLogin = async () => {
    // Implement the logic to authenticate the user

    if (!username || !password) {
      toast.error("Please provide both username and password");
      return;
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        dispatch(setUser(data.username));
        toast.success("Login successful");
      } else {
        const errorData = await res.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearAuth());
    setUsername("");
    setPassword("");
    toast.success("Logout successful");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <ToastContainer />
        {user ? (
          <div>
            <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-red-500 rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              Login
            </button>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">Demo Credentials:</h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>{`username : user\npassword: password`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

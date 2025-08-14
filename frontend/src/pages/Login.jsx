import React, { useContext, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from "../Context/authContext.jsx";
import { userDataContext } from "../Context/UserContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { serverUrl, loading, setLoading } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent default first
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      setUserData(result.data.user);
      navigate("/");
      console.log(result.data);
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative bg-gray-50">
      {/* Back button */}
      <div
        className="w-12 h-12 bg-red-600 cursor-pointer absolute top-10 left-5 rounded-full flex items-center justify-center hover:bg-red-700"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-6 h-6 text-white" />
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-6"
      >
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-center">
          Welcome To Airbnb
        </h1>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-lg">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 p-3 rounded-lg border border-gray-300 shadow-inner focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-lg">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 p-3 rounded-lg border border-gray-300 shadow-inner focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-600">
          Create a new account?{" "}
          <span
            className="text-red-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

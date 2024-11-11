import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import graphic from "../assets/graphic.png";

const Login = () => {
  const { login } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => login(username, password);

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#0575E6] via-[#02298A] to-[#021B79]">
      <div className="hidden md:flex flex-col items-start justify-center w-full lg:w-6/10 bg-gradient-to-b from-[#0575E6] via-[#02298A] to-[#021B79] p-8 lg:pl-32 relative min-h-screen">
        <div className="text-left text-white space-y-6">
          <h1 className="text-2xl sm:text-xl md:text-4xl font-bold">GoFinance</h1>
          <p className="text-lg sm:text-sm md:text-md font-semibold text-gray-200">
            Lorem ipsum dolor sit amet
          </p>
          <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white">
            Read More
          </button>
        </div>
        <img
          src={graphic}
          alt="Graphic"
          className="absolute bottom-0 left-0 w-32 md:w-1/3 lg:w-1/4 opacity-80 pointer-events-none object-contain"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      <div className="flex items-center justify-center w-full md:w-4/10 p-4 sm:p-8 bg-white">
        <div className="w-full max-w-md space-y-8 p-8 shadow-md rounded-lg">
          <div className="text-left space-y-1">
            <h2 className="text-2xl font-semibold text-gray-800">
              Hello Again!
            </h2>
            <p className="text-gray-800">Welcome Back</p>
          </div>

          <form className="mt-8 space-y-6 flex flex-col items-center" onSubmit={handleLogin}>
            <div className="relative w-full">
              <i className="codicon codicon-mail absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-12 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative w-full">
              <i className="codicon codicon-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-12 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>

            <div className="text-center mt-4">
              <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                Forgot Password
              </a>
            </div>

            <hr className="my-6 border-gray-300 w-full" />

            <div className="text-center">
              <span className="text-sm text-gray-800">
                Don't have an account?{" "}
              </span>
              <Link
                to="/register"
                className="text-sm text-blue-600 underline hover:text-blue-800"
              >
                Register Here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

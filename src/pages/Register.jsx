import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import graphic from "../assets/graphic.png";

const Register = () => {
    const { register } = useAuthContext();

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();
        const userData = {
            name,
            position,
            email,
            password,
        };
        register(userData);
    };

    return (
        <div className="flex h-screen bg-gradient-to-r from-blue-500 to-blue-700">
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
                    <h2 className="text-2xl font-semibold text-gray-800">Hello!</h2>
                    <p className="text-gray-800">Sign Up to Get Started</p>
                </div>

                <form className="mt-8 space-y-6 flex flex-col items-center" onSubmit={handleRegister}>
                    <div className="relative w-full">
                        <i className="bx bx-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Full Name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            name="name"
                            className="w-full px-12 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    <div className="relative w-full">
                        <i className="codicon codicon-briefcase absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="Position"
                            onChange={(e) => setPosition(e.target.value)}
                            value={position}
                            name="position"
                            className="w-full px-12 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    <div className="relative w-full">
                        <i className="codicon codicon-mail absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="email"
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            name="email"
                            className="w-full px-12 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    <div className="relative w-full">
                        <i className="codicon codicon-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            name="password"
                            className="w-full px-12 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-3 mt-4 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>

                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-800">
                            Already have an account?{" "}
                        </span>
                        <Link
                            to="/login"
                            className="text-sm text-blue-600 underline hover:text-blue-800"
                        >
                            Login Here
                        </Link>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
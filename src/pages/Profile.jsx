import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();

    const user = {
        name: "Jason Lee L. W.",
        position: "Sales Lead",
        email: "admin@gmail.com"
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
                <h2 className="text-lg text-center font-semibold mb-6">Profile</h2>
                <div className="text-left space-y-4">
                    <div className="flex">
                        <p className="font-semibold w-20">Name</p>
                        <p>: {user.name}</p>
                    </div>
                    <div className="flex">
                        <p className="font-semibold w-20">Position</p>
                        <p>: {user.position}</p>
                    </div>
                    <div className="flex">
                        <p className="font-semibold w-20">Email</p>
                        <p>: {user.email}</p>
                    </div>
                </div>

                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full px-4 py-2 mt-8 rounded-full text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Profile;

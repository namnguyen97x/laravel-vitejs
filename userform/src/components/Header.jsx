import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();
    const handleLogout = async () => {
        if (token) {
            try {
                await fetch("http://localhost:8000/api/auth/logout", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                localStorage.removeItem("access_token");
                console.log("Token removed from localStorage");
                navigate("/login", { replace: true });
            } catch (error) {
                console.error("Error logging out:", error);
            }
        }
    };

    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Hello</h1>
            <button className="text-white" onClick={handleLogout}>
                Logout
            </button>
        </header>
    );
};

export default Header;

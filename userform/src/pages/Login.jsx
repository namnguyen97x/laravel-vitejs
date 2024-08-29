import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

useEffect(() => {
    // Kiểm tra xem có email nào đã lưu trong localStorage không
    const savedEmail = localStorage.getItem("saved_email");
    if (savedEmail) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            email: savedEmail,
        }));
    }
}, []);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                formData
            );
            console.log("Full response:", response); // Log the entire response to see its structure

            const { access_token, role } = response.data.token.original;
            console.log("Access token:", access_token);
            console.log("Role:", role);

            // Lưu token lưu trong local storage
            localStorage.setItem("access_token", access_token);

            // Save the email to localStorage
            localStorage.setItem("saved_email", formData.email);

            // Chuyển hướng theo role của user
            if (role === "user") {
                console.log("Navigating to /guest");
                navigate("/guest");
            } else if (role === "admin") {
                console.log("Navigating to /dashboard");
                navigate("/dashboard");
            } else {
                console.log("Unknown role:", role);
            }

            console.log("User logged in:", response.data);
        } catch (error) {
            console.error(
                "Login error:",
                error.response ? error.response.data : error.message
            );
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={handleChange}
                                value={formData.email}
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleChange}
                                value={formData.password}
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <p>
                            Don't have an account?{" "}
                            <a className="text-blue-400" href="/register">
                                Register
                            </a>{" "}
                            now
                        </p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

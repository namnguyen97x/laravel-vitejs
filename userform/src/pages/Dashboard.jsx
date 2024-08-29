import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [editingUser, setEditingUser] = useState(null);
    const [errors, setErrors] = useState({});
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/users");
            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error("Unexpected response format:", response.data);
                setUsers([]); // Ensure users is always an array
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]); // Ensure users is always an array
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingUser) {
            await updateUser(editingUser.id);
        } else {
            await createUser();
        }
    };

    const createUser = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/users",
                form
            );
            setUsers([...users, response.data]);
            setForm({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            });
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const updateUser = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/users/${id}`,
                form
            );
            setUsers(
                users.map((user) => (user.id === id ? response.data : user))
            );
            setForm({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            });
            setEditingUser(null);
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const editUser = (user) => {
        setForm({
            name: user.name,
            email: user.email,
            password: "",
            password_confirmation: "",
        });
        setEditingUser(user);
        setShowForm(true);
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
            <button
                onClick={() => setShowForm(!showForm)}
                className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                {showForm ? "Hide Form" : "Create User"}
            </button>
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 mb-8 w-1/4 mx-auto"
                >
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    {errors.name && (
                        <div className="text-red-500">{errors.name[0]}</div>
                    )}
                    {errors.email && (
                        <div className="text-red-500">{errors.email[0]}</div>
                    )}
                    <div className="flex space-x-4">
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="password"
                            name="password_confirmation"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    {errors.password && (
                        <div className="text-red-500">{errors.password[0]}</div>
                    )}
                    <button
                        type="submit"
                        className="w-full p-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
                    >
                        {editingUser ? "Update" : "Create"} User
                    </button>
                </form>
            )}
            <ul className="space-y-4">
                {Array.isArray(users) &&
                    users.map((user) => (
                        <li
                            key={user.id}
                            className="flex justify-between items-center p-4 bg-white shadow rounded"
                        >
                            <div>
                                <p className="text-lg font-semibold">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => editUser(user)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteUser(user.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Dashboard;

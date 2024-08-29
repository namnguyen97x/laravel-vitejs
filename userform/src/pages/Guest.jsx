import { useState } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

export default function Guest() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(e) {
        setNewTask(e.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks([...tasks, newTask]);
        }
    }

    function handleKeyPress(e) {
        if (e.key === "Enter") {
            addTask();
        }
    }

    function removeTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [
                updatedTasks[index - 1],
                updatedTasks[index],
            ];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [
                updatedTasks[index + 1],
                updatedTasks[index],
            ];
            setTasks(updatedTasks);
        }
    }

    return (
        <>
            <Header />
            <h1 className="text-center text-5xl font-semibold mt-24 ">
                To do list
            </h1>
            <div>
                <div className="flex flex-row justify-center items-center mx-auto p-10">
                    <input
                        className="w-1/3 border-2 border-gray-700 rounded-md p-2"
                        type="text"
                        placeholder="Add task"
                        value={newTask}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="border-2 border-gray-700 rounded-md p-2 ml-1 bg-sky-600 text-white"
                        onClick={addTask}
                    >
                        Add your task
                    </button>
                </div>
                {tasks.length > 0 && (
                    <div>
                        <ul className="flex flex-col justify-center border-2 border-gray-700 rounded-md p-4 mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-[600px]">
                            {tasks.map((task, index) => (
                                <li
                                    className="border-b-2 py-1 text-center"
                                    key={index}
                                >
                                    <p className="flex justify-between align-middle p-[10px]">
                                        {task}
                                        <div className="btn-group">
                                            <button
                                                className="border-2 border-gray-700 rounded-md p-2 ml-1 bg-blue-600 text-white"
                                                onClick={() =>
                                                    moveTaskUp(index)
                                                }
                                            >
                                                Up
                                            </button>
                                            <button
                                                className="border-2 border-gray-700 rounded-md p-2 ml-1 bg-red-600 text-white"
                                                onClick={() =>
                                                    removeTask(index)
                                                }
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="border-2 border-gray-700 rounded-md p-2 ml-1 bg-green-600 text-white"
                                                onClick={() =>
                                                    moveTaskDown(index)
                                                }
                                            >
                                                Down
                                            </button>
                                        </div>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

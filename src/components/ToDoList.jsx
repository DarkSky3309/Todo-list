import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setTodoList, addTodo, sortTodo, updateTodo, toggleCompleted} from "../ToDoSlice";
import {TiPencil} from "react-icons/ti";
import {BsHddNetwork, BsTrash} from "react-icons/bs";
import empty from "../assets/empty.jpg"

const ToDoList = () => {
    const dispatch = useDispatch();
    const toDoList = useSelector(state => state.todo.todoList)
    const sortCriteria = useSelector(state => state.todo.sortCriteria)
    const [showModal, setShowModal] = useState(false);
    const [currentToDo, setCurentToDo] = useState(null)
    const [newTask, setNewTask] = useState("")

    useEffect(() => {
        if (toDoList.length > 0) {
            localStorage.setItem("ToDoList", JSON.stringify(toDoList))
        }
    }, [toDoList])

    useEffect(() => {
        const localTodoList = JSON.parse(localStorage.getItem("ToDoList"))
        if (localTodoList) {
            dispatch(setTodoList(localTodoList))
        }
    }, [])

    const handleAddToDo = (task) => {
        if (task.trim().length === 0) {
            alert("please enter a task")
        } else {
            dispatch(addTodo({
                task: task, id: Date.now()
            }))
        }
        setNewTask("")
        setShowModal(false)
    }

    const handleUpdateToDoList = (id, task) => {
        if (task.trim().length === 0) {
            alert("please enter a task")
        } else {
            dispatch(updateTodo({
                task: task, id: id
            }))
        }
        setShowModal(false)
        setNewTask("")
    }
    const handleDeleteToDo = (id) => {
        const updatedToDoList = toDoList.filter(todo => todo.id != id)
        dispatch(setTodoList(updatedToDoList))
        localStorage.setItem("ToDoList", JSON.stringify(updatedToDoList))
    }

    function handleSort(sortCriteria) {
        dispatch(sortTodo(sortCriteria))
    }

    const sortToDoList = toDoList.filter((todo) => {
        if (sortCriteria === "All") return true
        if (sortCriteria === "Completed" && todo.completed) return true;
        if (sortCriteria === "Not Completed" && !todo.completed) return true
        return false
    })

    const handleToggleCompleted = (id) => {
        dispatch(toggleCompleted(id))
    }

    return (
        <div>
            {showModal && (
                <div
                    className="fixed w-full left-0 top-0 h-full bg-transparentBlack flex items-center justify-center transition">\
                    <div className="bg-white p-8 rounded-md min-w-[350px] max-w-[500px] w-full">
                        <input className="w-full border b-2 rounded-md outline-none mb-8" type="text"
                               placeholder={currentToDo ? "Update your task here" : "Enter your task here"}
                               value={newTask}
                               onChange={(e) => setNewTask(e.target.value)}/>
                        <div className="flex justify-between">
                            {currentToDo ? (<>
                                <button className="bg-sunsetOrange rounded-md text-white py-3 px-10" onClick={() => {
                                    setCurentToDo(null)
                                    setShowModal(false);
                                    handleUpdateToDoList(currentToDo.id, newTask)
                                }}>Save
                                </button>
                                <button className="bg-Tangaroa rounded-md text-white py-3 px-10" onClick={() => {
                                    setShowModal(false)
                                    setCurentToDo(null);
                                }}>Cancel
                                </button>
                            </>) : (<>
                                <button className="bg-Tangaroa rounded-md text-white py-3 px-10"
                                        onClick={() => setShowModal(false)}>Cancel
                                </button>
                                <button
                                    className="bg-sunsetOrange rounded-md text-white py-3 px-10"
                                    onClick={() => {
                                        handleAddToDo(newTask)
                                    }}>Add
                                </button>
                            </>)}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center flex-col">{toDoList.length === 0 ?
                (<>
                    <div className="mb-8">
                        <div className="sm:w-[500px] sm:h[500px] min-w-[250px]">
                            <img src={empty} alt=""/>
                        </div>
                        <p className="text-center text-Gray">You have no todos, please add one</p>
                    </div>
                </>) :
                (<div className={"container mx-auto mt-6"}>
                    <div className={"flex justify-center mb-6"}>
                        <select className="p-1 outline-none" onChange={e => handleSort(e.target.value)}>
                            <option className={"text-sm"} value="All">All</option>
                            <option className={"text-sm"} value="Completed">Completed</option>
                            <option className={"text-sm"} value="Not Completed">Not Completed</option>
                        </select>
                    </div>
                    <div className={"w-full"}>
                        {sortToDoList.map(todo => (
                            <div key={todo.id}
                                 className={"flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-mb p-4 text-white"}>
                                <div
                                    className={`${todo.completed ? "line-through text-greenTeal" : "text-sunsetOrange"}`}
                                    onClick={() => {
                                        handleToggleCompleted(todo.id);
                                    }}>{todo.task}</div>
                                <div>
                                    <button className={"bg-blue-500 text-white p-1 rounded-md ml-2"} onClick={() => {
                                        setShowModal(true);
                                        setCurentToDo(todo);
                                        setNewTask(todo.task)
                                    }}><TiPencil/></button>
                                    <button className={"bg-sunsetOrange text-white p-1 rounded-md ml-2"}
                                            onClick={() => handleDeleteToDo(todo.id)}><BsTrash/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>)
            }
                <button onClick={() => setShowModal(true)}
                        className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md">Add Task
                </button>
            </div>
        </div>
    );
};

export default ToDoList;
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
    console.log(newTask)
    useEffect(() => {
        if (toDoList.length > 0) {
            localStorage.setItem("todolist", JSON.stringify(toDoList))
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

    const handleSort = (sortCriteria) => {
        dispatch(sortTodo(sortCriteria))
    }

    const sortToDoList = toDoList.filter((todo) => {
        if (sortCriteria === "All") return true
        if (sortCriteria === "Completed" && todo.completed) return true;
        if (sortCriteria === "Not Completed" && !todo.not.completed) return true
        return false
    })
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
                                <button>Save</button>
                                <button>Cancel</button>
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
                    (<div>
                        {sortToDoList.map(todo => (
                            <div>
                                <div>{todo.task}</div>
                            </div>
                        ))}
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
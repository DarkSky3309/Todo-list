import React from 'react';
import {addTodo, updateTodo} from "../ToDoSlice";
import {useDispatch} from "react-redux";



const ModalWindow = (props: any) => {
    let {showModal, setShowModal, currentToDo, setCurentToDo, newTask, setNewTask} = props.data

    const dispatch = useDispatch();
    const handleUpdateToDoList = (id: number, task: string) => {
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
    const handleAddToDo = (task: string) => {
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
        </div>
    );
};

export default ModalWindow;
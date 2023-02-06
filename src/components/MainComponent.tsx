import React from 'react';
import empty from "../assets/empty.jpg";
import empty_dark from "../assets/empty-dark.jpg";
import {TiPencil} from "react-icons/ti";
import {BsTrash} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {setTodoList, sortTodo, toggleCompleted} from "../ToDoSlice";


const MainComponent = (props: any) => {
    const dispatch = useDispatch();
    const sortCriteria = useSelector((state: any) => state.todo.sortCriteria)
    let {theme, setShowModal, setCurentToDo, setNewTask, toDoList} = props.data
    const handleToggleCompleted = (id: any) => {
        dispatch(toggleCompleted(id))
    }
    const sortToDoList = toDoList.filter((todo: any) => {
        if (sortCriteria === "All") return true;
        if (sortCriteria === "Completed" && todo.completed) return true;
        return sortCriteria === "Not Completed" && !todo.completed;

    })

    function handleSort(sortCriteria: any) {
        dispatch(sortTodo(sortCriteria))
    }

    const handleDeleteToDo = (id: any) => {
        const updatedToDoList = toDoList.filter((todo: any) => todo.id !== id)
        dispatch(setTodoList(updatedToDoList))
        localStorage.setItem("ToDoList", JSON.stringify(updatedToDoList))
    }

    return (
        <div className="flex items-center justify-center flex-col">{toDoList.length === 0 ?
            (<>
                <div className="mb-8">
                    <div className="sm:w-[500px] sm:h[500px] min-w-[250px]">
                        {theme === "light" ? <img src={empty} alt=""/> : <img src={empty_dark} alt=""/>}

                    </div>
                    <p className="text-center text-Gray">You have no todos, please add one</p>
                </div>
            </>) :
            (<div className={"container mx-auto mt-6"}>
                <div className={"flex justify-center mb-6"}>
                    <select className="p-1 outline-none dark:bg-slate-900 dark:text-white"
                            onChange={e => handleSort(e.target.value)}>
                        <option className={"text-sm"} value="All">All</option>
                        <option className={"text-sm"} value="Completed">Completed</option>
                        <option className={"text-sm"} value="Not Completed">Not Completed</option>
                    </select>
                </div>
                <div className={"w-full"}>
                    {sortToDoList.map((todo: any) => (
                        <div key={todo.id}
                             className={"flex items-center justify-between mb-6 bg-Tangaroa mx-auto w-full md:w-[75%] rounded-mb p-4 text-white cursor-pointer"}>
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
            <button onClick={() => {
                setShowModal(true);
                setNewTask(null)
            }}
                    className="bg-sunsetOrange text-center text-white py-3 px-10 rounded-md">Add Task
            </button>
        </div>
    );
};

export default MainComponent;
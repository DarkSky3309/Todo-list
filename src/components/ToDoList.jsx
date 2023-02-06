import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setTodoList} from "../ToDoSlice";
import ModalWindow from "./ModalWindow";
import MainComponent from "./MainComponent";

const ToDoList = (props) => {
    const dispatch = useDispatch();
    const toDoList = useSelector(state => state.todo.todoList)
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

    const modalWindowData = {
        showModal: showModal,
        setShowModal: setShowModal,
        currentToDo: currentToDo,
        setCurentToDo: setCurentToDo,
        newTask: newTask,
        setNewTask: setNewTask,
    }
    const mainWindowData = {
        theme: props.theme,
        setShowModal: setShowModal,
        setCurentToDo: setCurentToDo,
        setNewTask: setNewTask,
        toDoList: toDoList,
    }
    return (
        <div>
            <ModalWindow data={modalWindowData}/>
            <MainComponent data={mainWindowData}/>

        </div>
    );
};

export default ToDoList;
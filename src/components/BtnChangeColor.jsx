import React from 'react';
import {BsMoon, BsSun} from "react-icons/bs";
const BtnChangeColor = (props) => {
    return (
        <div className={"absolute top-10 right-10 z-0"}>
            {props.theme === "light" ? (<>
                <button className={"text-black border-2 p-2 rounded-2xl"} onClick={() => {props.setTheme('dark')}}><BsSun/></button>
            </>) : (<>
                <button className={"text-white border-2 p-2 rounded-2xl"} onClick={() => {props.setTheme('light')}}><BsMoon/></button>
            </>)}
        </div>
    );
};

export default BtnChangeColor;
import Heading from "./components/Heading";
import ToDoList from "./components/ToDoList";
import Btn_change_color from "./components/Btn_change_color";
import store from "./Store/store";
import {useState} from "react";

function App() {
    const [theme, setTheme] = useState('light')

    return (
        <div className={theme}>
            <div className="App font-Poppins py-16 px-6 min-h-screen mx-auto dark:bg-slate-900">
                <Heading/>
                <ToDoList theme={theme}/>
                <Btn_change_color theme={theme} setTheme={setTheme}/>
            </div>
        </div>

    );
}

export default App;

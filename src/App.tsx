import Heading from "./components/Heading";
import ToDoList from "./components/ToDoList";
import BtnChangeColor from "./components/BtnChangeColor";
import {useState} from "react";

function App() {
    const [theme, setTheme] = useState<string>('light')

    return (
        <div className={theme}>
            <div className="App font-Poppins py-16 px-6 min-h-screen mx-auto dark:bg-slate-900">
                <Heading/>
                <ToDoList theme={theme}/>
                <BtnChangeColor theme={theme} setTheme={setTheme}/>
            </div>
        </div>
    );
}

export default App;

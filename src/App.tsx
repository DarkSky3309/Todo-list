import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
            </header>
            <main>
                <TodoList/>
                <TodoList/>
                <TodoList/>

            </main>
            <footer>
            </footer>
        </div>
    );
}

function TodoList() {
    return (
        <div className={"todo__item"}>
            <h3>What to learn</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={true}/><span>CSS&HTML</span></li>
                <li><input type="checkbox" checked={true}/><span>JS</span></li>
                <li><input type="checkbox" checked={false}/><span>REACT&TS</span></li>
            </ul>
        </div>
    )
}

export default App;

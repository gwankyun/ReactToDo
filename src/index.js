import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

function ListItem(prop) {
    const [value, setValue] = useState(prop.value);
    const onRemove = prop.onRemove;

    function onChange(event) {
        setValue(event.target.value);
    }

    return (
        <div>
            <input type="text" value={value} onChange={onChange}/>
            <button onClick={onRemove}>刪除</button>
        </div>
    );
}

function List(prop) {
    const list = prop.value;
    const onRemove = prop.onRemove;

    return (
        list.map((i) =>
            <div>
                <ListItem id={i.id} value={i.value}
                    onRemove={() => onRemove(i.id)}
                />
            </div>
        )
    );
}

function Form(prop) {
    const onAdd = prop.onAdd;
    const [value, setValue] = useState("");

    function onChange(event) {
        setValue(event.target.value);
    }

    function onSubmit(event) {
        onAdd(value);
        setValue("");
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={onChange}/>
                <input type="submit" value="添加"/>
            </form>
        </div>
    );
}

function App() {
    const [list, setList] = useState([]);
    const [index, setIndex] = useState(0);

    function push(value) {
        let arr = [];
        Object.assign(arr, list);
        arr.push({id: index + 1, value: value});
        setIndex(index + 1);
        setList(arr);
    }

    function remove(id) {
        let arr = [];
        Object.assign(arr, list);
        let i = arr.find((i) => i.id === id);
        if (typeof(i) != "undefined") {
            let index = arr.indexOf(i);
            arr.splice(index, 1);
            setList(arr);
        }       
    }

    return (
        <div>
            <Form onAdd={push}/>
            <List value={list} onRemove={remove}/>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

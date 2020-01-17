import React, { useState, FC } from 'react';
import Immutable from 'immutable'
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

abstract class IClone<T> {
    abstract clone(): T;
}

class Content extends IClone<Content> {
    key: number;
    value: string;
    constructor(key_: number, value_: string) {
        super();
        this.key = key_;
        this.value = value_;
    }
    clone(): Content {
        return new Content(this.key, this.value);
    }
}

interface IListItemProps {
    value: string;
}

const ListItem: FC<IListItemProps> = props => {
    const [value, setValue] = useState<string>(props.value);

    return (
        <input type="text" value={value} onChange={e => setValue(e.target.value)} />
    );
}

interface IListProps {
    value: Immutable.List<Content>;
    onRemove: (key: number) => void;
}

const List: FC<IListProps> = props => {
    const value = props.value;
    const onRemove = props.onRemove;

    const list = value.map(i =>
        <li key={i.key}>
            <ListItem value={i.value} />
            <button onClick={_ => onRemove(i.key)}>刪除</button>
        </li>
    );

    return (
        <ul>{list}</ul>
    );
}

const App: FC = () => {
    const [value, setValue] = useState<Immutable.List<Content>>(Immutable.List<Content>());
    const [index, setIndex] = useState<number>(0);
    const [add, setAdd] = useState<string>("");

    function onRemove(key: number): void {
        const idx = value.findIndex(i => i.key === key);
        if (idx !== -1) {
            setValue(value.splice(idx, 1));
        }
    }

    function onAdd(): void {
        if (add) {
            setValue(value.push(new Content(index + 1, add)));
            setIndex(index + 1);
            setAdd("");
        }
    }

    return (
        <div>
            <ul>
                <li>
                    <input type="text" value={add} onChange={e => setAdd(e.target.value)} />
                    <button onClick={_ => onAdd()}>添加</button>
                </li>
            </ul>
            <List value={value} onRemove={onRemove} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

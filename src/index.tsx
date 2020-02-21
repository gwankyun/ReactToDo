import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import { produce } from 'immer';
import { List } from './list';
import { Button } from './button';
import { TextInput } from './text-input'

class Item {
  id: number;
  value: string;

  constructor() {
    this.id = 0;
    this.value = '';
  }
}

const App: FC = () => {
  const [list, setList] = useState<Item[]>([]);
  const [value, setValue] = useState<string>("");
  const [id, setId] = useState<number>(0);

  function onAdd() {
    const modified = produce(list, newList => {
      let item = new Item();
      item.id = id;
      item.value = value;
      newList.push(item);
    });

    setList(modified);
    setValue("");
    setId(id + 1);
  }

  function onRemove(index: number) {
    let modified = produce(list, newList => {
      newList.splice(index, 1);
    });

    setList(modified);
  }

  function onUpdate(index: number, value: string) {
    let modified = produce(list, newList => {
      let item = new Item();
      item.id = newList[index].id;
      item.value = value;
      newList[index] = item;
    });

    setList(modified);
  }

  return (
    <div>
      <div>
        <TextInput value={value}
          onChange={v => setValue(v)} />
        <Button onClick={onAdd}>添加</Button>
      </div>
      <List value={list} onItemRender={(v, i) => {
        let item = v as Item;
        return (
          <li key={item.id}>
            <TextInput value={item.value}
              onChange={v => onUpdate(i, v)} />
            <Button onClick={() =>
              onRemove(i)
            }>刪除</Button>
          </li>
        );
      }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

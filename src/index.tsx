import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import { produce } from 'immer';
import { List } from './list';
import { Button } from './button';
import { TextInput } from './text-input';
import { useArray } from './use-array';

interface IItem {
  id: number;
  value: string;
}

class Item implements IItem {
  id: number;
  value: string;

  constructor() {
    this.id = 0;
    this.value = '';
  }
}

const App: FC = () => {
  const [value, setValue] = useState<string>('');
  const [id, setId] = useState<number>(0);
  const array = useArray<Item>([]);

  function onAdd() {
    array.push({ id: id, value: value });
    setValue("");
    setId(id + 1);
  }

  function onRemove(index: number) {
    array.splice(index, 1);
  }

  function onUpdate(index: number, value: string) {
    array.set(index, {
      id: array.data[index].id,
      value: value
    });
  }

  return (
    <div>
      <div>
        <TextInput value={value}
          onChange={v => setValue(v)} />
        <Button onClick={onAdd}>添加</Button>
      </div>
      <List value={array.data} onItemRender={(v, i) => {
        let item = v as Item;
        return (
          <li key={item.id}>
            <TextInput value={item.value}
              onChange={v => onUpdate(i, v)} />
            <Button onClick={() =>
              onRemove(i)
            }>刪除</Button>
            <Button onClick={() => {
              array.update(newArray => {
                let newItem: Item = { id: item.id, value: item.value };
                newArray.splice(i, 1);
                newArray.unshift(newItem);
              });
            }}>置頂</Button>
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

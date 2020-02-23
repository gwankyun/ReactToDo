import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import { produce } from 'immer';
import { List } from './list';
import { Button } from './button';
import { TextInput } from './text-input';

function useUpdater<T>(init: T): [T, (updater: (newValue: T) => void) => void] {
  const [data, setData] = useState<T>(init);

  const update = (updater: (newValue: T) => void) => {
    const modified = produce(data, (newValue: T) => {
      updater(newValue);
    });
    setData(modified);
  };

  return [data, update];
}

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
  const [array, updateArray] = useUpdater<Item[]>([]);

  function onAdd() {
    if (value === '') {
      alert('不允許為空');
      return;
    }
    updateArray(newArray => {
      newArray.push({ id: id, value: value });
    });
    setValue('');
    setId(id + 1);
  }

  function onRemove(index: number) {
    updateArray(newArray => {
      newArray.splice(index, 1);
    });
  }

  function onUpdate(index: number, value: string) {
    updateArray(newArray => {
      newArray[index] = {
        id: array[index].id,
        value: value
      };
    });
  }

  function onTop(index: number) {
    updateArray(newArray => {
      const newItem = array[index];
      newArray.splice(index, 1);
      newArray.unshift(newItem);
    });
  }

  return (
    <div>
      <div className='Item'>
        <TextInput value={value}
          onChange={v => setValue(v)} />
        <Button onClick={onAdd}>添加</Button>
      </div>
      <List value={array} onItemRender={(v, i) => {
        let item = v as Item;
        return (
          <li key={item.id} className='Item'>
            <TextInput value={item.value}
              onChange={v => onUpdate(i, v)} />
            <Button onClick={() =>onRemove(i)}>刪除</Button>
            <Button onClick={() => onTop(i)}>置頂</Button>
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

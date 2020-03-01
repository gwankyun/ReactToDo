import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';

import { List } from './list';
import { Button } from './button';
import { TextInput } from './text-input';
import { useServer, Item } from './use-server';

const App: FC = () => {
  const server = useServer();

  return (
    <div>
      <div className='Item'>
        <TextInput value={server.value}
          onChange={v => server.setValue(v)} />
        <Button onClick={() => server.onAdd()}>添加</Button>
      </div>
      <List value={server.array} onItemRender={(v, i) => {
        let item = v as Item;
        return (
          <li key={item.id} className='Item'>
            <div>
              <TextInput value={item.value}
                onChange={v => server.onUpdate(i, v)} />
              <Button onClick={() => server.onRemove(i)}>刪除</Button>
              <Button onClick={() => server.onTop(i)}>置頂</Button>
            </div>
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

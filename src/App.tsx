import React, { FC, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Switch, Radio, Input, List, Row, Col } from 'antd';
import { useImmer } from 'use-immer';

interface ToDo {
  id: number;
  content: string;
  selected: boolean;
  deleted: boolean;
}

const App: FC = () => {
  const [current, setCurrent] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [list, upDateList] = useImmer<ToDo[]>([]);
  const [showDeleted, setShowDeleted] = useState<boolean>(true);

  const onAdd = useCallback((id: number, content: string) => {
    upDateList(draft => {
      draft.push({ id: id, content: content, selected: false, deleted: false });
      setCurrent('');
      setIndex(id + 1);
    });
  }, [upDateList]);

  const onRemove = useCallback((todo: ToDo) => {
    upDateList(draft => {
      const idx = draft.findIndex(v => v.id === todo.id);
      if (idx !== -1) {
        draft[idx].deleted = !draft[idx].deleted;
      }
    })
  }, [upDateList]);

  return (
    <div className="App">
      <Row>
        <Col span={20}>
          <Input className="Input" value={current} onChange={e => setCurrent(e.target.value)} />
        </Col>
        <Col span={4}>
          <Button className="Button"
            onClick={_ => onAdd(index, current)}>添加</Button>
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <div style={{ float: "left", marginLeft: "10px" }}>
            {"顯示完成項"}
          </div>
        </Col>
        <Col span={22}>
          <Switch className="Switch"
            defaultChecked={showDeleted} onChange={c => setShowDeleted(c)} />
        </Col>
      </Row>
      <List
        dataSource={list.filter(v => showDeleted ? true : !v.deleted)}
        renderItem={i =>
          <List.Item
            onMouseOver={_ => upDateList(draft => {
              const idx = draft.findIndex(v => v.id === i.id);
              if (idx !== -1) {
                draft[idx].selected = true;
              };
            })}
            onMouseLeave={_ => upDateList(draft => {
              const idx = draft.findIndex(v => v.id === i.id);
              if (idx !== -1) {
                draft[idx].selected = false;
              };
            })}
          >
            <div className={i.deleted ? "ToDo-deleted" : "ToDo"}>
              <Row>
                <Col span={20}>
                  <div className={i.deleted ? "Content-deleted" : "Content"}>
                    {i.content}
                  </div>
                </Col>
                <Col span={4}>
                  <Button className="Button"
                    style={{ display: i.selected ? 'block' : 'none' }}
                    onClick={_ => onRemove(i)}>{i.deleted ? "取消" : "完成"}</Button>
                </Col>
              </Row>
            </div>
          </List.Item>
        } />
    </div>
  );
};

export default App;

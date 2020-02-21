import React, { FC } from 'react';

export interface IListProps {
  value: any[];
  onItemRender: (item: any, index: number) => JSX.Element;
};

export const List: FC<IListProps> = props => {
  const value = props.value;
  const onItemRender = props.onItemRender;

  let view = value.map((item, index) =>
    onItemRender(item, index)
  );

  return (
    <ul>{view}</ul>
  );
};
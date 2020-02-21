import React, { FC } from 'react';

export interface IButtonProps {
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = props => {
  const onClick = props.onClick;

  return (
    <button onClick={_ =>
      onClick?.()
    }>{props.children}</button>
  );
};

import React, { FC } from 'react';

export interface ITextInput {
  value: string;
  onChange: (v: string) => void;
}

export const TextInput: FC<ITextInput> = props => {
  const value = props.value;
  const onChange = props.onChange;

  return (
    <input type="text" value={value}
      onChange={e => onChange(e.target.value)} />
  );
};

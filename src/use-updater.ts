import { useState } from 'react';
import { produce } from 'immer';

export type Updater<T> = (updater: (newValue: T) => void) => void;

export function useUpdater<T>(init: T): [T, Updater<T>] {
  const [data, setData] = useState<T>(init);

  const update = (updater: (newValue: T) => void) => {
    const modified = produce(data, (newValue: T) => {
      updater(newValue);
    });
    setData(modified);
  };

  return [data, update];
}

import React, { useState } from 'react';
import { produce } from 'immer';

export interface IArrayHook<T> {
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  push: (item: T) => void;
  splice: (start: number, count: number) => void;
  set: (index: number, item: T) => void;
  unshift: (...items: T[]) => void;
  update: (update: (newArray: T[]) => void) => void;
}

export function useArray<T>(init: T[]): IArrayHook<T> {
  // export function useArray<T>(init: T[]) {
  const [array, setArray] = useState<T[]>(init);

  let update = (u: (newArray: T[]) => void) => {
    const m = produce(array, (n: T[]) => {
      u(n);
    });
    setArray(m);
  };

  let unshift = (...items: T[]) => {
    const modified = produce(array, (newArray: T[]) => {
      newArray.unshift(...items);
    });

    setArray(modified);
  };

  let push = (item: T) => {
    const modified = produce(array, (newArray: T[]) => {
      newArray.push(item);
    });

    setArray(modified);
  };

  let splice = (start: number, count: number) => {
    let modified = produce(array, newArray => {
      newArray.splice(start, count);
    });

    setArray(modified);
  };

  let set = (index: number, item: T) => {
    let modified = produce(array, (newArray: T[]) => {
      newArray[index] = item;
    });

    setArray(modified);
  };

  return {
    update: update,
    data: array,
    setData: setArray,
    push: push,
    splice: splice,
    set: set,
    unshift: unshift
  };
}

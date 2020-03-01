import { useState } from 'react';
import { useUpdater, Updater } from './use-updater';

interface IItem {
    id: number;
    value: string;
}

export class Item implements IItem {
    id: number;
    value: string;

    constructor() {
        this.id = 0;
        this.value = '';
    }
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

class Server {
    value: string = '';
    setValue: SetState<string> = (_ => { });

    id: number = 0;
    setId: SetState<number> = (_ => { });

    array: Item[] = [];
    updateArray: Updater<Item[]> = (_ => { });

    onAdd(): void {
        if (this.value === '') {
            alert('不允許為空');
            return;
        }
        this.updateArray(newArray => {
            newArray.push({ id: this.id, value: this.value });
        });
        this.setValue('');
        this.setId(this.id + 1);
    }

    onRemove(index: number): void {
        this.updateArray(newArray => {
            newArray.splice(index, 1);
        });
    }

    onUpdate(index: number, value: string): void {
        this.updateArray(newArray => {
            newArray[index] = {
                id: this.array[index].id,
                value: value
            };
        });
    }

    onTop(index: number): void {
        this.updateArray(newArray => {
            const newItem = this.array[index];
            newArray.splice(index, 1);
            newArray.unshift(newItem);
        });
    }
}

export function useServer() {
    const [value, setValue] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [array, updateArray] = useUpdater<Item[]>([]);

    let server = new Server();
    server.value = value;
    server.setValue = setValue;
    server.id = id;
    server.setId = setId;
    server.array = array;
    server.updateArray = updateArray;

    return server;
}
// import { TodoItem } from './todo.store';
import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";

export interface TodoState {
    listTodo: TodoItem[];
}
export interface TodoItem {
    id: number;
    value: string;
}

@Injectable()
export class TodoStore extends ComponentStore<TodoState>{
    constructor() {
        //init state 
        super({ listTodo: [] })
    }

    readonly listTodo : Observable<TodoItem[]> = this.select((state) => state.listTodo)
    addNewTodo = this.updater((state: TodoState, todo: TodoItem) => {
        return {
            listTodo: [...state.listTodo, todo]
        }
    })
    removeTodo = this.updater((state: TodoState, id: number) => {
        state.listTodo.splice((state.listTodo.findIndex(x => x.id === id)), 1)
        return { listTodo: state.listTodo }
    })
    updateTodo = this.updater((state: TodoState, todo: TodoItem) => {
        state.listTodo.map(x => {
            const findItem = state.listTodo.find(x => x.id === todo.id)
            if (findItem) {
                return findItem
            } else {
                return x;
            }

        })
        return { listTodo: state.listTodo }
    })
}
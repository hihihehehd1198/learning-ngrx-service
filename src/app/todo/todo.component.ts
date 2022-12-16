import { TodoItem, TodoStore } from './todo.store';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  template: `
  <input (keydown)="addNewTodo($event)"/>
  <ul *ngIf="listTodo | async ">
      <li  *ngFor="let item of  listTodo | async " class="flex flex-row w-[100px]">
  <div>          <span>{{item.value}}</span>
          <button (click)="removeItem(item.id)">Delete</button></div>
      </li>

  </ul>
  `,
  styles: [
  ]
})
export class TodoComponent implements OnInit {

  store = inject(TodoStore)
  listTodo: Observable<TodoItem[]> = this.store.listTodo

  // constructor() {    this.listTodo = this.store.listTodo }


  ngOnInit(): void {
    console.log(this.listTodo)
  }
  addNewTodo(event: any): void {
    if (event.code.toString().toLowerCase().includes('enter')) {
      this.store.addNewTodo({
        id: +(Math.random() * 10).toFixed(0),
        value: event.target.value
      })
      event.target.value = ''
    }
  }
  removeItem(id: number): void {
    this.store.removeTodo(id)
    
  }
}

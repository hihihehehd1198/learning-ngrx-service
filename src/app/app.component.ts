import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <h1>test</h1>
    <!-- <app-todo></app-todo>    
    <app-todo-item></app-todo-item> -->
    <!-- <app-user-crud></app-user-crud> -->
    <app-user-ngrx></app-user-ngrx>    
  `,
  styles: []
})
export class AppComponent {
  title = 'angular-standalone-ngrx';
}

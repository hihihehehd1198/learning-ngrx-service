import { UserStore } from './../user-crud/user.store';
import { Component, OnInit } from '@angular/core';
import { tap, combineLatest, last, takeLast, Observable } from 'rxjs';
import { UserServiceService } from '../user-crud/user-service.service';
import { userItem } from './../user-crud/user.store';
@Component({
  selector: 'app-user-ngrx',
  template: `
   <input (keydown)="addUser($event)"/>
  <ul *ngIf="listUser$ | async ">
      <li  *ngFor="let item of  listUser$ | async " class="flex flex-row w-[300px] border-[1px] border-black justify-between p-[10px]">
            <span>{{item.email}}</span>
          <button class="rounded-[5px] border-[1px] bg-[yellow]" (click)="deleteUser(item.uid)">Delete</button>
      </li>

  </ul>
  `,
})
export class UserNgrxComponent implements OnInit {
  listUser$?: Observable<userItem[]>
  constructor(private userStore: UserStore, private userService: UserServiceService) { }

  ngOnInit(): void {
    this.listUser$ = this.userStore.listUser$.pipe() as Observable<userItem[]>

  }
  addUser(event:any) {
    if (event.code.toString().toLowerCase().includes('enter')) {
      this.userStore.addNewUser({uid : this.userService.createUID() , email: event.target.value})
      // event.target.value = ''
      this.listUser$?.pipe(last(),tap(x=>console.log)).subscribe()
    }
  }
  deleteUser(uid:any){
    this.userStore.deleteUser(uid)
  }
}

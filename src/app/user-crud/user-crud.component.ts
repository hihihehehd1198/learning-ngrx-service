import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { UserServiceService } from './user-service.service';

interface userInfo {
  displayName
  :
  string
  email
  :
  string
  emailVerified
  :
  boolean
  photoURL
  :
  string
  uid
  :
  string
}
@Component({
  selector: 'app-user-crud',
  template: `
  <!-- <h1>test</h1> -->
  <input class="border-[1px] border-[black] px-[20px]" type="text" placeholder="add new user " (keydown)="addUser($event)"/>
  <ng-container *ngIf="this.listUser$ |async ">
    <ul class="border-[1px] p-[20px]">
      <li class="flex flex-row justify-between" *ngFor="let item of this.listUser$ | async ">
  <span>        {{item.email || ''}}</span>
        <button (click)="deleteUser(item.uid)" class="border-[1px] border-[red] px-[10px]">delete</button>
      </li>

    </ul>
  </ng-container>
  `,
  styles: [
  ]
})
export class UserCrudComponent implements OnInit, OnDestroy {
  constructor(private userService: UserServiceService) {
    this.listUser$ = this.userService.getListUser().pipe(tap((x: Partial<userInfo>[]) => {
      console.log(x)
    }))
  }
  listUser$: Observable<any>
  ngOnInit(): void {
    //show list user from firebase 

  }
  ngOnDestroy(): void {
    // this.listUser$.unsubscribe()
  }
  addUser(e: any): void {
    if (e.code.toString().toLowerCase().includes('enter')) {
      const data: Pick<userInfo, 'email' | 'uid'> = {
        email: e.target.value,
        uid: this.userService.createUID()
      }
      this.userService.addUser(data).then(res => console.log(res))
      e.target.value = ''
    }
  }
  deleteUser(id: string): void {
    this.userService.deleteUser(id)
  }

}

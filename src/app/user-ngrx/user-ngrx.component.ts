import { UserStore } from './../user-crud/user.store';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
@Component({
  selector: 'app-user-ngrx',
  template: `
  <ul>
    <li></li>
  </ul>
  `,
  styles: [
  ]
})
export class UserNgrxComponent implements OnInit {

  constructor(private userStore: UserStore) { }

  ngOnInit(): void {
    // this.userStore.getAllUser().pipe(tap((x: any) => this.userStore.listUser$.pipe(tap((y: any) => console.log(y))).subscribe()).subscribe()
    // this.userStore.getAllUserState().subscribe((res:any) => console.log(res))
    // this.userStore.listUser$.subscribe(res=>console.log(res))

    this.userStore.getAllUser().pipe(
      tap(
        (x:any)=>{
          this.userStore.listUser$.subscribe((y:any)=>console.log(y))
        } 
      )
    ).subscribe()
  }

}

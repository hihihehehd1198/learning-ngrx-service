import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { state } from "@angular/animations";
import { ComponentStore } from "@ngrx/component-store"
import { UserServiceService } from "./user-service.service"
import { InitialState } from '@ngrx/store/src/models';

export const ADD_NEW_USER = 'ADD NEw USER '
export const ADD_NEW_USER_SUCCESS = 'ADD NEW USER SUCCESS'
export const ADD_NEW_USER_FAIL = 'ADD NEW USER FAIL'

export interface userItem {
    displayName: string,
    email: string,
    emailVerified: string,
    photoUrl: string,
    uid: string,

}
export interface userState {
    listUser: userItem[],
    error: string | null,
    loading: boolean,
}

@Injectable()
export class UserStore extends ComponentStore<userState>{

    constructor(private userService: UserServiceService) {
        super({ listUser: [], error: '', loading: false })
    }
    listUser$ = this.select(x=>x.listUser)

    getAllUser() {
     return    this.userService.getListUser().pipe(tap((x: any) => {

            this.updater((state) => ({
                ...state,
                listUser: [...x]
            }))
            
        }
        ))

    }



    addNewUser(data: any) {
        this.userService.addUser(data).then(() => {
            return this.updater((state) => ({
                ...state,
                listUser: [...state.listUser, data]
            }))
        })
        return;
    }
    deleteUser(id: any) {
        this.userService.deleteUser(id).then(() => {
            return this.updater((state) => {
                state.listUser.splice(state.listUser.findIndex(x => x.uid === id), 1)
                return ({
                    ...state,
                    listUser: [...state.listUser]
                })
            })
        })
        return;
    }

}
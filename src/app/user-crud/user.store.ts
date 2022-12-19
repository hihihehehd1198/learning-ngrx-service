import { Injectable } from '@angular/core';
import { combineLatest, concatMap, exhaustMap, Observable, pipe, switchMap, tap, Subscription, catchError, from } from 'rxjs';
import { state } from "@angular/animations";
import { ComponentStore, OnStateInit, tapResponse } from "@ngrx/component-store"
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
export class UserStore extends ComponentStore<userState> {

    constructor(private userService: UserServiceService) {
        super({ listUser: [], error: '', loading: false })
        this.getAllUser()
    }


    getAllUser() {
        return this.effect(
            pipe(
                () => this.userService.getListUser().pipe(tapResponse((response: any) => {

                    this.patchState({
                        error: '',
                        loading: false,
                        listUser: response
                    })
                }, (err) => {
                    console.log(err)
                }))
            )
        )
    }

    addNewUser(data: any) {
        


        return this.effect(
            pipe(() => from(this.userService.addUser(data)).pipe(tapResponse((res) => {
                // console.log(res)
                // this.patchState((state: userState) => ({
                //     ...state,
                //     listUser: [...state.listUser]
                // }))
            }, (err: any) => {
                console.log(err)
            })))
        )
    }


    deleteUser(id: any) {
        this.userService.deleteUser(id).then(() => {
            // return this.updater((state) => {
            //     state.listUser.splice(state.listUser.findIndex(x => x.uid === id), 1)
            //     return ({
            //         ...state,
            //         listUser: [...state.listUser]
            //     })
            // })
        })
        return;
    }
    listUser$ = this.select(x => x.listUser, { debounce: true })
}
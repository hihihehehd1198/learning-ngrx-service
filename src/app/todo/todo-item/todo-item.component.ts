import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
interface filmItem {
  director
  : string
  releaseDate
  : string
  title
  :
  string
  __typename
  :
  string
}
@Component({
  selector: 'app-todo-item',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">Error :(</div>
    <div *ngIf="rates">
      <div *ngFor="let rate of rates; index as filmItem">
        {{rate.__typename}}
        {{rate.title}}
        {{rate.releaseDate}}
        {{rate.director}}
      </div>
    </div>
  `,
  styles: [
  ]
})
export class TodoItemComponent implements OnInit {
  rates: any[] = []
  loading = true
  error: any
  constructor(private apollo: Apollo) { }


  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            allFilms {
              films {
                title
                director
                releaseDate
               
              }
            }
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result.data.allFilms.films as filmItem[]
        this.loading = result.loading
        this.error = result.error
      })
  }



}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoStore } from './todo/todo.store';
import { HttpClientModule } from '@angular/common/http'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core';
import { TodoItemComponent } from './todo/todo-item/todo-item.component';
import { UserCrudComponent } from './user-crud/user-crud.component'
import { UserServiceService } from './user-crud/user-service.service';
import { AngularFireModule } from '@angular/fire/compat'
import { FirestoreModule } from '@angular/fire/firestore'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'
import { environment } from '../environments/environment';
import { UserStore } from './user-crud/user.store';
import { UserNgrxComponent } from './user-ngrx/user-ngrx.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoItemComponent,
    UserCrudComponent,
    UserNgrxComponent,

  ],
  imports: [
    BrowserModule,
    ApolloModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [TodoStore, UserServiceService,UserStore,
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index'
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

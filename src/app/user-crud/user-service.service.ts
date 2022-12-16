import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
// import { doc, deleteDoc} from '@angular/fire/firestore'
import { deleteDoc , doc,deleteField } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private fireStore: AngularFirestore) {
    
  }
  getListUser(): Observable<any> {
    return this.fireStore.collection('users').valueChanges()  
  }
  createUID():string  {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
  }

  addUser(data: any): Promise<any> {
    const body = {
      displayName
        :
        null,
     
      emailVerified
        :
        false,
      photoURL
        :
        null,
        ...data
    }
    // return this.fireStore.collection('users').add(body)

    //create new doc with new uid 
    return this.fireStore.collection('users').doc(data['uid']).set({
      ...body
    })
  }
  deleteUser(id:any){
    // remove with uid of doc 
   return  this.fireStore.collection('users').doc(id).delete()
    // return this.fireStore.collection('users').
  }
}

import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import UsersModel from '../model/users';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private dbPath = '/Users';

  tutorialsRef: AngularFirestoreCollection<UsersModel>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<UsersModel> {
    return this.tutorialsRef;
  }

  isUser(userName:string, password:string):AngularFirestoreCollection<UsersModel> {
    return this.db.collection('Users', (ref) => ref.where(`user`, '==', `${userName}`).where('password','==',`${password}`));
  }

  create(tutorial: UsersModel): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
  
}

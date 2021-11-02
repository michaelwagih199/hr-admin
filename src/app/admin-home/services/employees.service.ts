import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import EmployeeModel from '../models/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private dbPath = '/employees';

  tutorialsRef: AngularFirestoreCollection<EmployeeModel>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<EmployeeModel> {
    return this.tutorialsRef;
  }

  create(tutorial: EmployeeModel): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
  
}

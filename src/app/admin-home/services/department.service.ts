import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
import DepartmentModel from '../models/departmentModel';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private dbPath = '/departments';

  tutorialsRef: AngularFirestoreCollection<DepartmentModel>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<DepartmentModel> {
    return this.tutorialsRef;
  }

  create(tutorial: DepartmentModel): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }

}

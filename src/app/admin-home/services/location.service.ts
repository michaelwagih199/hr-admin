import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import LocationModel from '../models/locationModel';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private dbPath = '/locations';

  tutorialsRef: AngularFirestoreCollection<LocationModel>;

  constructor(private db: AngularFirestore) {
    this.tutorialsRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<LocationModel> {
    return this.tutorialsRef;
  }

  create(tutorial: LocationModel): any {
    return this.tutorialsRef.add({ ...tutorial });
  }

  update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }

}

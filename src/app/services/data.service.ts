import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Item } from '../models/Item';

@Injectable()
export class DataService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(public afs: AngularFirestore) { 
    this.items = this.afs.collection('participants').valueChanges();
    //this.itemsCollection = this.afs.collection('participants');
  }

  getItems(){
    return this.items;
  }

}
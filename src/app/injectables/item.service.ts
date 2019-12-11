import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { shareReplay, map } from 'rxjs/operators';
import { Item } from '../interfaces/item';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    itemRef: AngularFirestoreCollection;
    varierty: AngularFirestoreCollection;
    units: AngularFirestoreCollection;
    constructor(private readonly db: AngularFirestore) {
        this.varierty = this.db.collection('Variety');
        this.units = this.db.collection('Units');
        this.itemRef = this.db.collection('Items');
    }
    addItem(formItem: Item) {
        return this.itemRef.add({
            Name: formItem.name,
            Company: formItem.company,
            Category: formItem.category,
            Expiry: firestore.Timestamp.fromDate(formItem.expiry),
            Quantity: formItem.quantity,
            MeasureIn: formItem.measureIn,
            UserId: formItem.userId
        });
    }
    getCategory() {
        return this.varierty.snapshotChanges().pipe(map((q) => {
            return q.map(item => {
                const data: Object = item.payload.doc.data();
                const id = item.payload.doc.id;
                return { id, ...data };
            })
        }), shareReplay());
    }
    getUnits() {
        return this.units.stateChanges().pipe(map((q) => {
            return q.map(item => {
                const data: Object = item.payload.doc.data();
                const id = item.payload.doc.id;
                return { id, ...data };
            })
        }), shareReplay());
    }


}
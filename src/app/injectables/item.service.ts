import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { shareReplay, map } from 'rxjs/operators';
import { Item } from '../interfaces/item';
import { firestore } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    constructor(private readonly db: AngularFirestore) {

    }
    addItem(formItem: Item) {
        return this.db.collection('Items').add({
            Name: formItem.name,
            Company: formItem.company,
            Category: formItem.category,
            Expiry: firestore.Timestamp.fromDate(formItem.expiry),
            Quantity: formItem.quantity,
            MeasureIn: formItem.measureIn
        });
    }
    getCategory() {
        return this.db.collection('Variety').get().pipe(map((q) => q.docs),
            map((item) => item.filter(s => s.exists)), shareReplay());
    }
    getUnits() {
        return this.db.collection('Units').get().pipe(map((q) => q.docs),
            map((item) => item.filter(s => s.exists)), shareReplay());
    }
}
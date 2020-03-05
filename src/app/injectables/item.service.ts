import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { shareReplay, map, tap } from 'rxjs/operators';
import { Item } from '../interfaces/item';
import { firestore } from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    itemRef: AngularFirestoreCollection;
    variety: AngularFirestoreCollection;
    units: AngularFirestoreCollection;
    varietyCollection = [];
    constructor(private readonly db: AngularFirestore) {
        this.variety = this.db.collection('Variety');
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
        return this.variety.snapshotChanges().pipe(map((q) => {
            return q.map(item => {
                const data: Object = item.payload.doc.data();
                const id = item.payload.doc.id;
                return { id, ...data } as any;
            })
        }), shareReplay()).pipe(tap((i) => this.varietyCollection = i));
    }
    getUnits() {
        return this.units.stateChanges().pipe(map((q) => {
            return q.map(item => {
                const data: Object = item.payload.doc.data();
                const id = item.payload.doc.id;
                return { id, ...data } as any;
            })
        }), shareReplay());
    }
    getItems(userId: string) {
        return this.db.collection('Items', res => res.where('UserId', '==', userId).orderBy('Expiry'))
            .snapshotChanges().pipe(map((list: DocumentChangeAction<object>[]) => {
                return list.map((item) => {
                    const id = item.payload.doc.id;
                    return { id, ...item.payload.doc.data() } as any;
                })
            }), shareReplay());
    }
    getItemForDashboard(userId: string) {
        const date = new Date();
        return this.db.collection('Items', res => res.where('UserId', '==', userId)
            .orderBy('Expiry')
            .startAt(new Date(date.setDate(date.getDate() - 1)))
            .endAt(new Date(date.setDate(date.getDate() + 3))))
            .snapshotChanges().pipe(map((list: DocumentChangeAction<object>[]) => {
                return list.map((item) => {
                    const id = item.payload.doc.id;
                    return { id, ...item.payload.doc.data() } as any;
                })
            }), shareReplay());
    }
    removeItem(documentId: string) {
        return this.db.collection('Items').doc(documentId).delete();
    }
    updateItem(item: any) {
        return this.itemRef.doc(item.id).update({
            Quantity: item.quantity,
            Category: item.category
        });
    }
}
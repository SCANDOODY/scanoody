import { QantityPipe } from './qantity.pipe';
import { TestBed } from '@angular/core/testing';
import { ItemService } from '../injectables/item.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, of } from 'rxjs';
export const FirestoreStub = {
  collection: (_name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
    snapshotChanges: () => of({}),
    stateChanges: () => of({})
  }),
};
describe('QantityPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: FirestoreStub }, ItemService]
    })
  });
  it('create an instance', () => {
    const service = TestBed.get(ItemService);
    const pipe = new QantityPipe(service);
    expect(pipe).toBeTruthy();
  });
});

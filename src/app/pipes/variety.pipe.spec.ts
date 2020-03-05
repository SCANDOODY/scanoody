import { VarietyPipe } from './variety.pipe';
import { ItemService } from '../injectables/item.service';
import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from './qantity.pipe.spec';

describe('VarietyPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: FirestoreStub }, ItemService]
    })
  });
  it('create an instance', () => {
    const service = TestBed.get(ItemService);
    const pipe = new VarietyPipe(service);
    expect(pipe).toBeTruthy();
  });
});

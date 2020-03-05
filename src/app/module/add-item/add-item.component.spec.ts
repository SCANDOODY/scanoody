import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemComponent } from './add-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { mockAngularFireAuth } from 'src/app/auth/auth.service.spec';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from 'src/app/pipes/qantity.pipe.spec';
import { AuthService } from 'src/app/auth/auth.service';
import { ItemService } from 'src/app/injectables/item.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddItemComponent', () => {
  let component: AddItemComponent;
  let fixture: ComponentFixture<AddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule],
      declarations: [AddItemComponent],
      providers: [{ provide: AngularFireAuth, useValue: mockAngularFireAuth },
      { provide: AngularFirestore, useValue: FirestoreStub },
        AuthService,
        ItemService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

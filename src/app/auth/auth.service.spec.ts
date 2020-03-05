import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreStub } from '../pipes/qantity.pipe.spec';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
// An anonymous user
const authState = {
  displayName: null,
  isAnonymous: true,
  uid: '17WvU2Vj58SnTz8v7EqyYYb0WRc2'
};

export const mockAngularFireAuth: any = {
  auth: jasmine.createSpyObj('auth', {
    'signInAnonymously': Promise.reject({
      code: 'auth/operation-not-allowed'
    }),
    'signInWithPopup': Promise.reject(),
    'signOut': Promise.reject()
  }),
  authState: of(authState)
};


describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule.withRoutes([])],
    providers: [{ provide: AngularFireAuth, useValue: mockAngularFireAuth }, { provide: AngularFirestore, useValue: FirestoreStub }]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});

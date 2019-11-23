import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: any;
  private readonly authError = new BehaviorSubject('');
  authError$ = this.authError.asObservable();
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) { }
  getUserState() {
    return this.afAuth.authState;
  }
  createUser(user) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredentials) => {
        this.newUser = user;
        userCredentials.user.updateProfile({
          displayName: user.firstName + ' ' + user.lastName
        });
        this.insertUser(userCredentials).then(() => this.router.navigate(['home']));
      }).catch((error) => this.authError.next(error));
  }
  insertUser(userCredentials: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredentials.user.uid}`).set({
      email: this.newUser.email,
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      role: 'NA'
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
      if (user) {
        this.router.navigate(['home']);
      }
    }).catch((err) => this.authError.next(err));
  }
}

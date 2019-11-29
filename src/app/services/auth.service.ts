import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth, public firestore: AngularFirestore) {}

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  loginUser(
    newEmail: string,
    newPassword: string
  ): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
  }

  // signupUser(email: string, password: string, firstName: string, lastName: string, phoneNum: number): Promise<any> { 
  //   return firebase.auth().createUserWithEmailAndPassword(email, password).then((newUserCredential: firebase.auth.UserCredential) => {
  //   firebase.firestore().doc(`/userProfile/${newUserCredential.user.uid}`).set({ email, password, firstName, lastName, phoneNum });
  //   }).catch(error => {
  //   console.error(error);
  //   throw new Error(error);
  //   });
  //   }

    signupUser(userEmail: string, userPassword: string, userFirstName: string, userLastName: string, userPhoneNum: number): Promise<any> { 
      return firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((newUserCredential: firebase.auth.UserCredential) => {
      firebase.firestore().doc(`/User/${userEmail}`).set({ userEmail, userPassword, userFirstName, userLastName, userPhoneNum });
      }).catch(error => {
      console.error(error);
      throw new Error(error);
      });
      }

  anonymousLogin(): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInAnonymously();
  }

  linkAccount(email: string, password: string): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);

    return this.afAuth.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(
        userCredential => {
          this.firestore.doc(`/User/${userCredential.user.uid}`).update({ email });
        },
        error => {
          console.log('There was an error linking the account', error);
        }
      );
  }

  resetPassword(userEmail: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(userEmail);
  }

  logoutUser():Promise<void> {
  //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  //   .then(function() {
  //     var provider = new firebase.auth.GoogleAuthProvider();
  //   // In memory persistence will be applied to the signed in Google user
  //   // even though the persistence was set to 'none' and a page redirect
  //   // occurred.
  //   return firebase.auth().signInWithRedirect(provider);
  // })
  // .catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  // });
    return firebase.auth().signOut();
    }

}


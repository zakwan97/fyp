import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import 'firebase/firestore';

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
    })
export class ProfileService {

    
public userProfile: firebase.firestore.DocumentReference;
public userProfile1: AngularFirestoreCollection<any>;
public currentUser: firebase.User;
public userId: string;
email1: string;

//public emergencyContact: firebase.firestore.QueryDocumentSnapshot;
constructor(public afAuth: AngularFireAuth, private firestore: AngularFirestore)

{
firebase.auth().onAuthStateChanged(user => {
if (user) {
this.currentUser = user;
this.userProfile = firebase.firestore().doc(`/User/${user.email}`)

          }
});

this.afAuth.authState.subscribe(user => {
    this.userId = user.email;
    this.userProfile1 = this.firestore.collection(`/User/`);
   
  });

}

getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
    }

    updateName(userFirstName: string): Promise<void> {
        return this.userProfile.update({ userFirstName});
        }

        updateName2(userLastName: string): Promise<void> {
            return this.userProfile.update({ userLastName });
            }

        updateDOB(birthDate: string): Promise<any> {
            return this.userProfile.update({ birthDate });
            }

            updatePhoneNum (userPhoneNum: string): Promise<any>{
                return this.userProfile.update({userPhoneNum});
            }

            updateICNumber (userICNumber: number): Promise<any>{
                return this.userProfile.update({userICNumber});
            }

            updateAddress (userAddress: string): Promise<any>{
                return this.userProfile.update({userAddress});
            }

            // updateEmergencyContact1 (emergencyContact1: number): Promise<any>{
            //     return this.userProfile.update({emergencyContact1});
            // }

            // updateEmergencyContact2 (emergencyContact2: number): Promise<any>{
            //     return this.userProfile.update({emergencyContact2});
            // }

            // updateEmergencyContact3 (emergencyContact3: number): Promise<any>{
            //     return this.userProfile.update({emergencyContact3});
            // }


            updateEmail(newEmail: string, userPassword: string): Promise<any> {
                const credential: firebase.auth.AuthCredential =
                firebase.auth.EmailAuthProvider.credential(
                this.currentUser.email,
                userPassword
                );
                return this.currentUser
                .reauthenticateAndRetrieveDataWithCredential(credential)
                .then(() => {
                this.email1=this.currentUser.email; 
                this.userProfile1.add({email1: newEmail});
                this.currentUser.updateEmail(newEmail).then(() => {
                this.userProfile.update({ userEmail : newEmail });
                
               
                });
                })
                .catch(error => {
                console.error(error);
                });
                }

                updatePassword(newPassword: string, oldPassword: string): Promise<any> {
                    const credential: firebase.auth.AuthCredential =
                    firebase.auth.EmailAuthProvider.credential(
                    this.currentUser.email,
                    oldPassword);
                    return this.currentUser.reauthenticateAndRetrieveDataWithCredential(credential).then(() => {
                    this.currentUser.updatePassword(newPassword).then(() => {
                    console.log('Password Changed');});
                    return this.userProfile.update({userPassword : newPassword});

                    }).catch(error => {console.error(error);});
                    }


                    

}

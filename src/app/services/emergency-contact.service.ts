import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
AngularFirestore,
AngularFirestoreCollection,
AngularFirestoreDocument,
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {

public update: firebase.firestore.CollectionReference;
public baca: firebase.firestore.DocumentReference;
public baca2: firebase.firestore.DocumentReference;
public baca3: firebase.firestore.DocumentReference;
public emergencyContact1: AngularFirestoreCollection<any>;
public currentUser: firebase.User;
contact_number:any[] = new Array(3);


public userId: string;
public contactID: string;
public  ContactNum1: String;
public  ContactNum2: String;


  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore) 
    {
      this.afAuth.authState.subscribe(user => {
      this.userId = user.email;
      this.emergencyContact1 =this.firestore.collection(`/User/${user.email}/EmergencyContact`);
      
      
      });
      {
        firebase.auth().onAuthStateChanged(user => {
        if (user) {
        this.currentUser = user;
        //this.emergencyContact1 =this.firestore.collection(`/userProfile/${user.email}/emergencyContact`);
        // this.baca = firebase.firestore().doc(`/userProfile/${user.email}/emergencyContact/Contact`+1)
        this.baca = firebase.firestore().doc(`/User/${user.email}/EmergencyContact/Contact`+1);
        this.baca2 = firebase.firestore().doc(`/User/${user.email}/EmergencyContact/Contact`+2);
        this.baca3 = firebase.firestore().doc(`/User/${user.email}/EmergencyContact/Contact`+3);
      }
        for (let i = 0; i < 3; i++) {
          // firebase.firestore().doc(`/userProfile/${user.email}/emergencyContact/Contact`+ i);
          this.contact_number[i]=firebase.firestore().doc(`/User/${user.email}/EmergencyContact/Contact`+1);
          

      }

                  
        });
        }
        // {
        //   firebase.auth().onAuthStateChanged(user => {
        //   if (user) {
        //   this.currentUser = user;
        //   //this.emergencyContact1 =this.firestore.collection(`/userProfile/${user.email}/emergencyContact`);
        //   this.baca2 = firebase.firestore().doc(`/userProfile/${user.email}/emergencyContact/Contact`+2);
        //             }
        //   });
        //   }
       }

      getEmergencyContactList(): AngularFirestoreCollection<any> {
        return this.emergencyContact1;
        }

        getEmergencyC(): firebase.firestore.DocumentReference{
          // //this.result =this.baca;
           return this.baca;
        }
        getEmergencyC2(): firebase.firestore.DocumentReference{
          return this.baca2;
        }

        getEmergencyC3(): firebase.firestore.DocumentReference{
          return this.baca3;
        }


        getEmergencyContact() :AngularFirestoreCollection<any> {
          //return this.firestore.doc(`/userProfile/${this.userId}/emergencyContact/${ContactNum1}`)
          // return this.firestore.doc(`/userProfile/${this.userId}/emergencyContact`);
          return this.emergencyContact1;
          }

          getContact(): AngularFirestoreCollection<EmergencyContactService> {
            return this.firestore.collection(`EmergencyContact`);
          }

        updateContact1(ContactNum: String): Promise<any> {
          return this.emergencyContact1.doc(`Contact1`).update({ContactNum});
        }

        updateContactName1(ContactName: String): Promise<any> {
          return this.emergencyContact1.doc(`Contact1`).update({ContactName});
        }

        updateContact2(ContactNum: String): Promise<any> {
          return this.emergencyContact1.doc(`Contact2`).update({ContactNum});
        }

        updateContactName2(ContactName: String): Promise<any> {
          return this.emergencyContact1.doc(`Contact2`).update({ContactName});
        }

        updateContact3(ContactNum: String): Promise<any> {
          return this.emergencyContact1.doc(`Contact3`).update({ContactNum});
        }

        updateContactName3(ContactName: String): Promise<any> {
          return this.emergencyContact1.doc(`Contact3`).update({ContactName});
        }

          async createEmergencyContact(
          ContactID: String,
           ContactName1: String,
           ContactNum1: String,
           ContactName2: String,
           ContactNum2: String,
           ContactName3: String,
           ContactNum3: String,
           ): 
            Promise<any> {
          //  const newemergencyListRef = await this.emergencyContact1.doc(`${ContactNum1}`).set({
            const newemergencyListRef = await this.emergencyContact1.doc(`Contact`+1).set({
              ContactID : "Contact1" ,
              ContactName :ContactName1,
              ContactNum :ContactNum1,
              
           })
           const newemergencyListRef1 = await this.emergencyContact1.doc(`Contact`+2).set({
            ContactID : "Contact2" ,
            ContactName : ContactName2,
            ContactNum : ContactNum2,   
         })
         const newemergencyListRef2 = await this.emergencyContact1.doc(`Contact`+3).set({
          ContactID : "Contact3" ,
          ContactName: ContactName3,
          ContactNum :ContactNum3,   
       })
          }


          // updateContact1(ContactNum1: string): Promise<any>{
          //   return this.emergencyContact.doc(`${ContactNum1}`).update({ContactNum1});
          // }

          // updateContact1(ContactNum1: string): Promise<any>{
          //   return this.emergencyContact.doc(`contact1`).update({ContactNum1});
          // }

          // updateContact2(ContactNum2: string): Promise<any>{
          //   return this.emergencyContact.doc(`${ContactNum2}`).update({ContactNum2});
          // }

          // updateContact3(ContactNum3: string): Promise<any>{
          //   return this.emergencyContact.doc(`${ContactNum3}`).update({ContactNum3});
          // }

          // removeEmergencyContact(emergencyContact: string): Promise<any> {
          //   return this.emergencyContact.doc(emergencyContact).delete();
          // }

          
        
}

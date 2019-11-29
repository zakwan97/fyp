import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  public userId: string;
  public emergencyList: AngularFirestoreCollection<any>;
  public emergencyList1: AngularFirestoreCollection<any>;
  public record: string;
  private count : number = 1;


  constructor(public afAuth: AngularFireAuth,
    private firestore: AngularFirestore) 
    {
      this.afAuth.authState.subscribe(user => {
        this.userId = user.email;
        this.emergencyList = this.firestore.collection(`/User/${user.email}/EmergencyAlert`);
        this.emergencyList1 = this.firestore.collection(`/User/${user.email}/Emergency`);
      });
    }

    
    getEmergencyList(): AngularFirestoreCollection<any> {
      return this.emergencyList;
    }

    getEmergency(emergencyID: string): AngularFirestoreDocument<any> {
      return this.firestore.doc(`/User/${this.userId}/EmergencyAlert/${'emergency'+emergencyID}`);
    }

    async createEmergency(
      emergencyID: number = this.count++,
      emergencyType: string,
      emergencyDate: string = null,
      emergencyTime: string,
      lat: any,
      long: any,): 
      Promise<any> {

     //const newemergencyListRef: firebase.firestore.DocumentReference = await this.emergencyList.add({});

     const newemergencyListRef = await this.emergencyList.doc(`${'emergency'+emergencyID}`).set({

        emergencyID,
        emergencyId : "emergency"+emergencyID,
        emergencyType,
        emergencyDate,
        emergencyTime,
        lat,
        long,
        //emergencynum: emergencyID,
        userEmail: this.userId,
     })

     const newemergencyListRef1 = await this.emergencyList1.doc(`${'emergency'+emergencyID}`).set({

      emergencyID: "emergency"+emergencyID,
   })
    }

    async createEmergency2(
      emergencyID: number ,
      emergencyName: string,
      emergencyDate: string = null,
      emergencyTime: string,
      lat: any,
      long: any): 
      Promise<any> {

     //const newemergencyListRef: firebase.firestore.DocumentReference = await this.emergencyList.add({});

    //  const newemergencyListRef = await this.emergencyList.doc(`${'emergency'+emergencyID}`).set({

    //     emergencyID,
    //     emergencyName,
    //     emergencyDate,
    //     emergencyTime,
    //     lat,
    //     long,
    //  })
    }


    async createEmergency3(
      emergencyID: number ,
      emergencyName: string,
      emergencyDate: string = null,
      emergencyTime: string,
      lat: any,
      long: any): 
      Promise<any> {

     //const newemergencyListRef: firebase.firestore.DocumentReference = await this.emergencyList.add({});

    //  const newemergencyListRef = await this.emergencyList.doc(`${'emergency'+emergencyID}`).set({

    //     emergencyID,
    //     emergencyName,
    //     emergencyDate,
    //     emergencyTime,
    //     lat,
    //     long,
    //  })
    }

    removeEmergency(emergencyID: string): Promise<any> {
      return this.emergencyList.doc(`${'emergency'+emergencyID}`).delete();
    }
  
}

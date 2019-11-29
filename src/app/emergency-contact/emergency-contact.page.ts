import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {EmergencyContactService} from '../services/emergency-contact.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentData,
  } from '@angular/fire/firestore';

@Component({
  selector: 'app-emergency-contact',
  templateUrl: './emergency-contact.page.html',
  styleUrls: ['./emergency-contact.page.scss'],
})
export class EmergencyContactPage   {

  public baca: Observable<any>;
 contacts: Observable<any>;
 singlecontact: Observable<any>;
 lala: Promise<DocumentData>;
 contactss: Promise<DocumentData>;
 contact1: Observable<any>;
  Id: string;
  nombor: any;
  tepon : any;
  ContactNum1 : any;
  public update: firebase.firestore.DocumentReference;
  

public hello: any;
  tepon2: any;
  hideMe: boolean;
  alive: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private contact: EmergencyContactService,
    private actionSheetCtrl: ActionSheetController,
    private firestore: AngularFirestore,
    private statusBar: StatusBar,
   
  ) {

        // let status bar overlay webview
  this.statusBar.overlaysWebView(true);
   }

   // hide html

   hide() {
    this.hideMe = true;
    this.contact.getEmergencyC().get().then(userProfileSnapshot => {
      this.nombor = userProfileSnapshot.data();  
    });
  }

  hide2() {
    this.hideMe = true;
    this.contact.getEmergencyC2().get().then(userProfileSnapshot => {
      this.nombor = userProfileSnapshot.data();  
    });
  }

  hide3() {
    this.hideMe = true;
    this.contact.getEmergencyC3().get().then(userProfileSnapshot => {
      this.nombor = userProfileSnapshot.data();  
    });
  }


  // refresh page

   doRefresh(event) {

    console.log('Begin async operation');
  

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);

  }


  // display

  ionViewDidEnter(){

    this.contacts = this.contact.getEmergencyContactList().valueChanges();

    
    this.Id = this.route.snapshot.paramMap.get('id');
    //this.contacts = this.contact.getEmergencyContact().valueChanges();

  //   this.baca=this.contact.getEmergencyContactList().doc("Contact"+1);
  //   this.nombor = this.baca.get().forEach(function(doc) {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //     // this.tepon = doc.id;
  //     // console.log(this.tepon);
  // });
 
  }


  // update function

  async updateContactName1(): Promise<void> {

    
    const alert = await this.alertCtrl.create({
    subHeader: 'Contact Name',
    inputs: [
      { name: 'ContactName', type: 'text',  placeholder: 'Your phone Number' , value: this.nombor.ContactName}
    ],
  
    buttons: [
    { text: 'Cancel' },
    {
    text: 'Save',
    handler: data => {
    this.contact.updateContactName1(data.ContactName);},
    },
    ],
  
    });
  
    await alert.present();
    }

    async updateContact1(): Promise<void> {
  
      
      const alert = await this.alertCtrl.create({
      subHeader: 'Contact Number',
      inputs: [
        { name: 'ContactNum', type: 'number',  placeholder: 'phone Number' , value: this.nombor.ContactNum }
      ],
    
      buttons: [
      { text: 'Cancel' },
      {
      text: 'Save',
      handler: data => {
      this.contact.updateContact1(data.ContactNum);},
      },
      ],
    
      });
    
      await alert.present();
      }


  

    async updateContactName2(): Promise<void> {

    
      const alert = await this.alertCtrl.create({
      subHeader: 'Contact Name',
      inputs: [
        { name: 'ContactName', type: 'text',  placeholder: 'Name',  value: this.nombor.ContactName}
      ],
    
      buttons: [
      { text: 'Cancel' },
      {
      text: 'Save',
      handler: data => {
      this.contact.updateContactName2(data.ContactName);},
      },
      ],
    
      });
    
      await alert.present();
      }


    async updateContact2(): Promise<void> {
  
      
      const alert = await this.alertCtrl.create({
      subHeader: 'Contact Number',
      inputs: [
        { name: 'ContactNum', type: 'number',  placeholder: 'phone Number', value: this.nombor.ContactNum}
      ],
    
      buttons: [
      { text: 'Cancel' },
      {
      text: 'Save',
      handler: data => {
      this.contact.updateContact2(data.ContactNum);},
      },
      ],
    
      });
    
      await alert.present();
      }

      

        async updateContactName3(): Promise<void> {

    
          const alert = await this.alertCtrl.create({
          inputs: [
            { name: 'ContactName', type: 'text',  placeholder: 'Your phone Number',  value: this.nombor.ContactName}
          ],
        
          buttons: [
          { text: 'Cancel' },
          {
          text: 'Save',
          handler: data => {
          this.contact.updateContactName3(data.ContactName);},
          },
          ],
        
          });
        
          await alert.present();
          }
    
        async updateContact3(): Promise<void> {
          const alert = await this.alertCtrl.create({
          inputs: [
            { name: 'ContactNum', type: 'number',  placeholder: 'Your phone Number' , value: this.nombor.ContactNum}
          ],
        
          buttons: [
          { text: 'Cancel' },
          {
          text: 'Save',
          handler: data => {
          this.contact.updateContact3(data.ContactNum);},
          },
          ],
        
          });
        
          await alert.present();
          }
  

          // option 

        async moreBillOptions(ContactID): Promise<void> {
          const action = await this.actionSheetCtrl.create({
            header: 'Edit Details?',
            buttons: [
              {
                text: 'Edit',
                role: 'destructive',
                icon: 'settings',
                handler: () => {
                  if(ContactID=="Contact1"){
                    console.log("Hai")

                    this.contact.getEmergencyC().get().then(userProfileSnapshot => {
                      this.nombor = userProfileSnapshot.data();
                      
                    
                    });
                  }
                  else if(ContactID=="Contact2"){
                    console.log("Hello")

                    this.contact.getEmergencyC2().get().then(userProfileSnapshot => {
                      this.nombor = userProfileSnapshot.data();

                    });
                  }
                  else{
                    console.log("H")
                    
                    this.contact.getEmergencyC3().get().then(userProfileSnapshot => {
                      this.nombor = userProfileSnapshot.data();
                    });
                  };
                },
              },
              {
                text: 'Cancel',
                role: 'cancel',
                icon: 'close',
                handler: () => {
                  console.log('Cancel clicked');
                },
              },
            ],
          });
          action.present();
        }

}

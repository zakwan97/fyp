import { Component, OnInit } from '@angular/core';
import {GeolocationService} from '../services/geolocation.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { ToastController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';
import { EmergencyContactService } from '../services/emergency-contact.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.page.html',
  styleUrls: ['./emergency.page.scss'],
})
export class EmergencyPage  {

  public emergencyForm: FormGroup;
  private lat: any = '';
  private long: any = '';
  responseObj:any;
  geoLatitude: number;
  geoLongitude: number;
  geoAddress: string;
  private latitude: string;
  private longitude: string;
  private phoneNumber: string;
  private phoneNumber2: string;
  private phoneNumber3: string;

  private textMessage: string;
  private text1: string;
  private text2: string;
  private text3: string;

  // utk kegunaan nk send msg and create emergency
  private name:string;
  public userProfile: any;

  private emergencyName: string;
  private emergencyDate: string;
  private emergencyID: number;
  private userEmail: string;
  private emergencyTime: string;
  private date1: string;
  private date2: string;

  // utk kegunaan emergency contact
  private nombor: any;
  private nombor2: any;
  private nombor3: any;

  tepon: any;

  geoencoderOptions: NativeGeocoderOptions = {
   useLocale: true,
   maxResults: 5
 }; 
  phoneNumber1: any;
  documentRef: any;
  
  constructor(public router: Router,
    formBuilder: FormBuilder,
    public geoService: GeolocationService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private toastCtrl: ToastController,
    private sms: SMS,
    private profileService: ProfileService,
    public contact :EmergencyContactService ,
    private statusBar: StatusBar,
    ) {
          // let status bar overlay webview
  this.statusBar.overlaysWebView(true);
      {
      this.emergencyForm = formBuilder.group({
        emergencyName: ['', Validators.required],
        emergencyDate: ['', Validators.required],
        lat: ['', Validators.required],
        long: ['', Validators.required],
      });
      
    } }

    //utk refresh

    doRefresh(event) {

      console.log('Begin async operation');
      

      setTimeout(() => {
        console.log('Async operation has ended');
        event.target.complete();
      }, 1000);

      
      this.ngOnInit();
      this.getGeolocation();
      this.getGeoencoder(this.latitude,this.longitude);
      this.generateAddress(this.responseObj.addressObj);
      console.log('dapat');

    }

  ngOnInit() {
    let date = new Date()
      console.log("Current Date ",date)
      
    this.getGeolocation();
    this.getGeoencoder(this.latitude,this.longitude);
  }

  // get location
  getGeolocation(){
    //this.showLoader();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.responseObj = resp.coords;
      console.log(this.responseObj); 
      //this.hideLoader();
     this.getGeoencoder(this.responseObj.latitude,this.responseObj.longitude);
     })
    //  .catch((error) => {
    //    alert('Error getting location'+ JSON.stringify(error));
    //    //this.hideLoader();
    //  });
  }


  getGeoencoder(latitude,longitude){
   // this.showLoader();
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderReverseResult[]) => {
      this.responseObj.address = this.generateAddress(result[0]);
      //this.hideLoader();
    })
    // .catch((error: any) => {
    //   alert('Error getting location'+ JSON.stringify(error));  // aku comment skejap utk present
    //   //this.hideLoader();
    // });
  }

  //generate address
  generateAddress(addressObj){
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      address += obj[val]+', ';
    }
    console.log(address);
  return address.slice(0, -2); 
}

viewList():void{
  this.router.navigateByUrl('/view-emergency')
}

// Report emergency
  async createEmergency(emergencyForm) {

    if (this.emergencyForm.value.emergencyName == ""){
        console.log("Tak pilih situation");
        
        const toast =  await this.toastCtrl.create({
          message: "Please Select Situation first",
          duration: 3000,
        });
        toast.present();
    }
    else {
      let date = new Date()
      this.date1 = date.toDateString();
      this.date2 = date.toTimeString();
      this.geoService.createEmergency(
        
        // key in data into database
        this.emergencyID,
        this.name=emergencyForm.value.emergencyName,
        //this.date1=this.emergencyDate.substring(0,10),
        this.date1.substring(0,19),
        //this.emergencyForm.value.emergencyDate.substring(0,10),
        this.emergencyTime=this.date2.substring(0,8),
        this.lat = this.responseObj.latitude ,
        this.long= this.responseObj.longitude,
          )
        .then(
           () => {
            
            //read contact
            this.contact.getEmergencyC().get().then(userProfileSnapshot => {
  
              this.nombor = userProfileSnapshot.data();
  
              this.phoneNumber=this.nombor.ContactNum;
  
              console.log("Contact1 = " ,this.phoneNumber)
            
            //read user profile
            this.profileService.getUserProfile().get().then( async userProfileSnapshot => {
            this.userProfile = userProfileSnapshot.data();
            
            // SMS text
            this.text1="#1 ALERT! 1 This is an emergency message from ";
            console.log(this.text1);
            this.text2=this.userProfile.userFirstName+" "+this.userProfile.userLastName;
            console.log(this.text2);
            this.text3="Type of emergency: "+this.name+" at http://www.google.com/maps/place/"+this.responseObj.latitude+","+this.responseObj.longitude;
            this.textMessage=this.text1+this.text2+","+this.text3;
            
            // retrieve emergency contact number 
            // this.contact.getEmergencyC().get().then(userProfileSnapshot => {
  
            //   this.nombor = userProfileSnapshot.data();
  
            //   this.phoneNumber=this.nombor.ContactNum;
  
            //   console.log("Contact1 = " ,this.phoneNumber)
            // });
  
            // if contact is not 0
            if (this.nombor.ContactNum != " "){
              
              this.sms.send(String(this.phoneNumber),this.textMessage);
              console.log("Berjaya hantar kat nombor ni "+ this.phoneNumber);
  
              const toast =  await this.toastCtrl.create({
                message: "Text Message is sent to your Emergency Contacts",
                duration: 3000,
              });
              toast.present();
              //this.router.navigateByUrl('view-emergency');
            }
            else {
              const toast = await this.toastCtrl.create({
                message: "Contact 1 has no contact, Alert message was not sent",
                duration: 3000,
              });
              toast.present();
              console.log();
            }
            
          }, 
          
          error => {
            console.log(error);
          }
        );
      });// end of getEmergencyC
      
      
      }); // then
  
    }
      
  }

  async createEmergency2(emergencyForm) {

    if (this.emergencyForm.value.emergencyName == ""){
      console.log("Tak pilih situation");

     
  }
  else{
    let date = new Date();
    this.date1 = date.toDateString();
    this.date2 = date.toTimeString();
    this.geoService.createEmergency2(
      
      this.emergencyID,
      this.name=emergencyForm.value.emergencyName,
      //this.date1=this.emergencyDate.substring(0,10),
      this.date1.substring(0,19),
      //this.emergencyForm.value.emergencyDate.substring(0,10),
      this.emergencyTime=this.date2.substring(0,29),
      this.lat = this.responseObj.latitude ,
      this.long= this.responseObj.longitude,
        )
      .then(
         () => {

          this.contact.getEmergencyC2().get().then(userProfileSnapshot => {
            this.nombor2 = userProfileSnapshot.data();

            this.phoneNumber2=this.nombor2.ContactNum;

            console.log("Contact2 = " ,this.phoneNumber2)
          
          this.profileService.getUserProfile().get().then( async userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();

          this.contact.getEmergencyC2().get().then(userProfileSnapshot => {
            this.nombor2 = userProfileSnapshot.data();
      
            this.phoneNumber2=this.nombor2.ContactNum;
      
            console.log("Contact2 2 = " ,this.phoneNumber2)
          });

          this.phoneNumber2=this.nombor2.ContactNum;
          console.log("nak sent ke contact2");
          console.log(this.phoneNumber2); // dah keluar

          this.text1="#2 ALERT! This is an emergency message from ";
          console.log(this.text1);
          this.text2=this.userProfile.userFirstName+" "+this.userProfile.userLastName;
          console.log(this.text2);
          this.text3="Type of emergency: "+this.name+" at http://www.google.com/maps/place/"+this.responseObj.latitude+","+this.responseObj.longitude;
          this.textMessage=this.text1+this.text2+","+this.text3;

          // retrieve emergency contact number 
          this.contact.getEmergencyC2().get().then(userProfileSnapshot => {
            this.nombor = userProfileSnapshot.data();
            this.phoneNumber2=this.nombor2.ContactNum;

            console.log("Contact2 = " ,this.phoneNumber2)
          });

          if (this.nombor2.ContactNum != ""){
            this.sms.send(String(this.phoneNumber2),this.textMessage);
            console.log("Berjaya 2 "+ this.phoneNumber2);
            const toast =  await this.toastCtrl.create({
              message: "Text Message is sent to your Emergency Contacts",
              duration: 3000,
            });
            //this.router.navigateByUrl('view-emergency')
            toast.present();
          }
          else {
            const toast1 = await this.toastCtrl.create({
              message: "Contact 2 has no contact, Alert message was not sent",
              duration: 3000,
            });
            toast1.present();
          }
          //this.router.navigateByUrl('view-emergency');
        },
        error => {
          console.log(error);
        }
      );
    });
    
    }); // then
  }
  }

  createEmergency3(emergencyForm) {

    if (this.emergencyForm.value.emergencyName == ""){
      console.log("Tak pilih situation");
  }
  else{
    let date = new Date()
    
    this.date1 = date.toDateString();
    this.date2 = date.toTimeString();
    this.geoService.createEmergency3(
      
      this.emergencyID,
      this.name=emergencyForm.value.emergencyName,
      //this.date1=this.emergencyDate.substring(0,10),
      this.date1.substring(0,19),
      //this.emergencyForm.value.emergencyDate.substring(0,10),
      this.emergencyTime=this.date2.substring(0,29),
      this.lat = this.responseObj.latitude ,
      this.long= this.responseObj.longitude,
        )
      .then(
         () => {

          this.contact.getEmergencyC3().get().then(userProfileSnapshot => {
            this.nombor3 = userProfileSnapshot.data();
            
            this.phoneNumber3=this.nombor3.ContactNum;
          console.log(this.phoneNumber3); // dah keluar

          // retrieve personal information
          this.profileService.getUserProfile().get().then( async userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();

          

          this.text1="#3 ALERT! This is an emergency message from ";
          console.log(this.text1);
          this.text2=this.userProfile.userFirstName+" "+this.userProfile.userLastName;
          console.log(this.text2);
          this.text3="Type of emergency: "+this.name+" at http://www.google.com/maps/place/"+this.responseObj.latitude+","+this.responseObj.longitude;
          this.textMessage=this.text1+this.text2+","+this.text3;

          //retrieve emergency contact number 
          // this.contact.getEmergencyC3().get().then(userProfileSnapshot => {
          //   this.nombor = userProfileSnapshot.data();
          
          //   this.phoneNumber3=this.nombor.ContactNum;

          //   console.log("Contact3 = " ,this.phoneNumber3)
          // });

          if (this.nombor3.ContactNum != ""){
            
            this.sms.send(String(this.phoneNumber3),this.textMessage);
            console.log("Berjaya 3 send ke"+ this.phoneNumber3);
            const toast =  await this.toastCtrl.create({
              message: "Text Message is sent to your available Emergency Contacts",
              duration: 3000,
            });
            toast.present();
            this.router.navigateByUrl('view-emergency')
          }
          else{
            const toast1 = await this.toastCtrl.create({
              message: "Contact 3 has no contact, Alert message was not sent",
              duration: 3000,
            });
            toast1.present();
            
          }
         // this.router.navigateByUrl('view-emergency');
        },
        error => {
          console.log(error);
        }
      );
    });
    
    }); // then


  }
    
  }
  
  
  


}

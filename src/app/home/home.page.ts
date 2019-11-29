import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services//auth.service';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public userProfile: any;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    private profileService: ProfileService,
    private router: Router
                  ) { }

  ionViewDidEnter(){
  this.profileService.getUserProfile().get().then( userProfileSnapshot => {
  this.userProfile = userProfileSnapshot.data();});
  }

    // async updateEmergencyContact1(): Promise<void> {
    //   const alert = await this.alertCtrl.create({
    //   inputs: [
    //     { name: 'emergencyContact1', type: 'number',  placeholder: 'Your 1st Emergency Contact', value: this.userProfile.emergencyContact1,}
    //   ],

    //   buttons: [
    //   { text: 'Cancel' },
    //   {
    //   text: 'Save',
    //   handler: data => {
    //   this.profileService.updateEmergencyContact1(data.emergencyContact1);},
    //   },
    //   ],

    //   });
    //   await alert.present();
    //   }

    //   async updateEmergencyContact2(): Promise<void> {
    //     const alert = await this.alertCtrl.create({
    //     inputs: [
    //       { name: 'emergencyContact1', type: 'number',  placeholder: 'Your 2nd Emergency Contact', value: this.userProfile.emergencyContact1,}
    //     ],
  
    //     buttons: [
    //     { text: 'Cancel' },
    //     {
    //     text: 'Save',
    //     handler: data => {
    //     this.profileService.updateEmergencyContact2(data.emergencyContact1);},
    //     },
    //     ],
  
    //     });
    //     await alert.present();
    //     }

    //     async updateEmergencyContact3(): Promise<void> {
    //       const alert = await this.alertCtrl.create({
    //       inputs: [
    //         { name: 'emergencyContact3', type: 'number',  placeholder: 'Your 3rd Emergency Contact', value: this.userProfile.emergencyContact3,}
    //       ],
    
    //       buttons: [
    //       { text: 'Cancel' },
    //       {
    //       text: 'Save',
    //       handler: data => {
    //       this.profileService.updateEmergencyContact3(data.emergencyContact3);},
    //       },
    //       ],
    
    //       });
    //       await alert.present();
    //       }


               
                 
}

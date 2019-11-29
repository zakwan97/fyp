import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services//auth.service';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { ProvidersFeature } from '@angular/core/src/render3';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage {


public userProfile: any;
private birthDate: string;
private date: string;



  constructor(
private alertCtrl: AlertController,
private authService: AuthService,
private profileService: ProfileService,
private router: Router,
private statusBar: StatusBar,) 

{ 
  {

    // let status bar overlay webview
this.statusBar.overlaysWebView(true);
}
                
              }
    
              
  // ngOnChanges()
  // {
  //   this.profileService
  //   .getUserProfile().get().then( userProfileSnapshot => {
  //   this.userProfile = userProfileSnapshot.data();
  //   this.birthDate = userProfileSnapshot.data().birthDate;
  //   });
  // }


  doRefresh(event) {

    console.log('Begin async operation');
    
      this.profileService.getUserProfile().get().then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        this.birthDate = userProfileSnapshot.data().birthDate;   
    });
  

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }


  ionViewDidEnter(){
    this.profileService.getUserProfile().get().then( userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.data();
      this.birthDate = userProfileSnapshot.data().birthDate;   
  });
}

  // ngOnInit() {
  //   this.profileService.getUserProfile().get().then( userProfileSnapshot => {
  //   this.userProfile = userProfileSnapshot.data();
  //   this.birthDate = userProfileSnapshot.data().birthDate;
  //   });
  // }



  logOut(): void {
    this.authService.logoutUser().then( () => {
    this.router.navigateByUrl('/login');
   
    });
    }


    async updateName() {

      const alert = await this.alertCtrl.create({
      subHeader: 'Your first name ',
      inputs: [{
      type: 'text',
      name: 'userFirstName',
      placeholder: 'Your first name',
      value: this.userProfile.userFirstName,
      },],
      buttons: [
      { text: 'Cancel' },
      {
      text: 'Save',
      handler: data => {
      this.profileService.updateName(data.userFirstName)},
      },
      ],

      });
      await alert.present();
      }

      async updateName2() {

        const alert = await this.alertCtrl.create({
        subHeader: 'Your last name',
        inputs: [{
        type: 'text',
        name: 'userLastName',
        placeholder: 'Your last name',
        value: this.userProfile.userLastName,
        },],
        buttons: [
        { text: 'Cancel' },
        {
        text: 'Save',
        handler: data => {
        this.profileService.updateName2(data.userLastName)
      },
        },
        ],
  
        });
        await alert.present();
        }

      updateDOB(birthDate: string): void {
        if (birthDate === undefined) {
          return;
          }
          this.date=this.birthDate.substring(0,10);
          this.profileService.updateDOB(this.date);
          }

          async updateEmail(): Promise<void> {
            const alert = await this.alertCtrl.create({
            inputs: [
            { type: 'text', name: 'newEmail', placeholder: 'Your new email' },
            { name: 'userPassword', placeholder: 'Your password', type: 'text', value: this.userProfile.userPassword},],
            buttons: [
            { text: 'Cancel' },
            {
            text: 'Save',
            handler: data => {
            this.profileService
            .updateEmail(data.newEmail, data.userPassword)
            .then(() => {
            console.log('Email Changed Successfully');
            })
            .catch(error => {
            console.log('ERROR: ' + error.message);
            });
            },
            },
            ],
            });
            await alert.present();
            }

            async updatePassword(): Promise<void> {
              const alert = await this.alertCtrl.create({
              inputs: [
              { name: 'newPassword', placeholder: 'New password', type: 'password' },
              { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
              ],
              buttons: [
              { text: 'Cancel' },
              {text: 'Save',
              handler: data => {
              this.profileService.updatePassword(
              data.newPassword,
              data.oldPassword
              );
            },
          },
          ],
          });
          await alert.present();
          }

          async updatePhoneNum(): Promise<void> {
            const alert = await this.alertCtrl.create({
            inputs: [
              { name: 'userPhoneNum', type: 'number',  placeholder: 'Your phone Number', value: this.userProfile.userPhoneNum,}
            ],
      
            buttons: [
            { text: 'Cancel' },
            {
            text: 'Save',
            handler: data => {
            this.profileService.updatePhoneNum(data.userPhoneNum);},
            },
            ],
      
            });
            await alert.present();
            }


            async updateICNumber(): Promise<void> {
              const alert = await this.alertCtrl.create({
              inputs: [
                { name: 'userICNumber', type: 'number',  placeholder: 'Your IC Number', value: this.userProfile.userICNumber,}
              ],
        
              buttons: [
              { text: 'Cancel' },
              {
              text: 'Save',
              handler: data => {
              this.profileService.updateICNumber(data.userICNumber);},
              },
              ],
        
              });
              await alert.present();
              }

              async updateAddress(): Promise<void> {
                const alert = await this.alertCtrl.create({
                inputs: [
                  { name: 'userAddress', type: 'text',  placeholder: 'Your Address', value: this.userProfile.userAddress}
                ],
          
                buttons: [
                { text: 'Cancel' },
                {
                text: 'Save',
                handler: data => {
                this.profileService.updateAddress(data.userAddress);},
                },
                ],
          
                });
          
                
                await alert.present();
                }
          
    


}


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {GeolocationService} from '../services/geolocation.service';
//import { Plugins, CameraResultType } from '@capacitor/core';

//const { Camera } = Plugins;

@Component({
  selector: 'app-emergency-details',
  templateUrl: './emergency-details.page.html',
  styleUrls: ['./emergency-details.page.scss'],
})
export class EmergencyDetailsPage implements OnInit {
  emergency: Observable<any>;
  Id: string;
  test: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private actionCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private geolocationService: GeolocationService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.Id = this.route.snapshot.paramMap.get('id');
    // this.Id=this.route.snapshot.data.get('emergencynum');
    this.emergency = this.geolocationService.getEmergency(this.Id).valueChanges();
    console.log(this.emergency);
   }

  async showOptions(): Promise<void> {
    const action = await this.actionCtrl.create({
      header: 'Selection',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.geolocationService.removeEmergency(this.Id).then(() => {
              this.router.navigateByUrl('home');
            });
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


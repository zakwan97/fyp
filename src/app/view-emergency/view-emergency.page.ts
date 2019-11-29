import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeolocationService } from '../services/geolocation.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-view-emergency',
  templateUrl: './view-emergency.page.html',
  styleUrls: ['./view-emergency.page.scss'],
})
export class ViewEmergencyPage  {

  public emergencyList: Observable<any>;
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private geoService: GeolocationService,
    private router: Router,
    private statusBar: StatusBar,
  ) 
  {

     // let status bar overlay webview
     this.statusBar.overlaysWebView(true);
  }

  ionViewDidEnter(){
    this.emergencyList = this.geoService.getEmergencyList().valueChanges();
  }

  async moreBillOptions(emergencyId): Promise<void> {
    const action = await this.actionSheetCtrl.create({
      header: 'Delete Details?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.geoService.removeEmergency(emergencyId);
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

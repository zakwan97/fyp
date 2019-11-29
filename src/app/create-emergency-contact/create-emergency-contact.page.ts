import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {EmergencyContactService} from '../services/emergency-contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-create-emergency-contact',
  templateUrl: './create-emergency-contact.page.html',
  styleUrls: ['./create-emergency-contact.page.scss'],
})
export class CreateEmergencyContactPage implements OnInit  {
  contacts: Observable<any>;
  public ContactForm: FormGroup;
  Id: string;
  private ContactID : string;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private contact: EmergencyContactService,
    private route: ActivatedRoute,
    private statusBar: StatusBar,
    
  )

  {
        // let status bar overlay webview
    this.statusBar.overlaysWebView(true);
    
    {
    this.ContactForm = formBuilder.group({
      ContactName1: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      ContactNum1: ['', Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(11)])],
      ContactName2: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      ContactNum2: ['', Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(11)])],
      ContactName3: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      ContactNum3: ['', Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(11)])],
    });
    
  } }

  // ionViewDidEnter() {
  //   this.Id = this.route.snapshot.paramMap.get('id');
  //   this.contacts = this.contact.getEmergencyContact(this.Id).valueChanges();
  // }

  ngOnInit(){
    this.Id = this.route.snapshot.paramMap.get('Contact1');
    //this.contacts = this.contact.getEmergencyContact().valueChanges();
  }

  createContact(ContactForm) {
    this.contact
    .createEmergencyContact(
    this.ContactID,
    ContactForm.value.ContactName1,
    ContactForm.value.ContactNum1,
    ContactForm.value.ContactName2,
    ContactForm.value.ContactNum2,
    ContactForm.value.ContactName3,
    ContactForm.value.ContactNum3,
    ).
    then(
    () => {
    this.router.navigateByUrl('login');
    },
    error => {
    console.log(error);
    }
    );
}


async updateContact1(): Promise<void> {
  const alert = await this.alertCtrl.create({
  inputs: [
    { name: 'ContactNum1', type: 'text',  placeholder: 'Your phone Number', value: this.contact.ContactNum1,}
  ],

  buttons: [
  { text: 'Cancel' },
  {
  text: 'Save',
  handler: data => {
  this.contact.updateContact1(data.ContactNum1);},
  },
  ],

  });

  
  await alert.present();
  }


  async updateContact2(): Promise<void> {
    const alert = await this.alertCtrl.create({
    inputs: [
      { name: 'ContactNum2', type: 'text',  placeholder: 'Your phone Number', value: this.contact.ContactNum2,}
    ],
  
    buttons: [
    { text: 'Cancel' },
    {
    text: 'Save',
    handler: data => {
    this.contact.updateContact2(data.ContactNum2);},
    },
    ],
  
    });
  
    await alert.present();
    }

    
}

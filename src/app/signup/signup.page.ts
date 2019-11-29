import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
public signupForm: FormGroup;
public loading: any;

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private statusBar: StatusBar) 
    {

       // let status bar overlay webview
    this.statusBar.overlaysWebView(true);

      this.signupForm = this.formBuilder.group({
      userEmail: ['',Validators.compose([Validators.required, Validators.email]),],
      userPassword: ['',Validators.compose([Validators.minLength(6),Validators.maxLength(10), Validators.required]),],
      userFirstName:['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(20)])],
      userLastName:['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(20)])],
      //birthDate: ['', Validators.compose([Validators.required])]
      phoneNum:['', Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(11)])],
    } );
      
      }

  ngOnInit() {
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
    console.log('Need to complete the form, current value: ', signupForm.value);
    } 
    else {
    const userEmail: string = signupForm.value.userEmail;
    const userPassword: string = signupForm.value.userPassword;
    const userFirstName: string = signupForm.value.userFirstName;
    const userLastName: string = signupForm.value.userLastName;
    const phoneNum: number = signupForm.value.phoneNum;
    this.authService.signupUser(userEmail, userPassword, userFirstName, userLastName, phoneNum).then(() => {this.loading.dismiss().then(() => {this.router.navigateByUrl('create-emergency-contact');});
    },
    
    error => {this.loading.dismiss().then(async () => {const alert = await this.alertCtrl.create({
    message: error.message,
    buttons: [{ text: 'Ok', role: 'cancel' }],});

  await alert.present();
  });});
  this.loading = await this.loadingCtrl.create();
  await this.loading.present();
  }
  }

}


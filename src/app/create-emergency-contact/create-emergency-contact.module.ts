import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TextMaskModule, TextMaskConfig } from 'angular2-text-mask';
import { IonicModule } from '@ionic/angular';

import { CreateEmergencyContactPage } from './create-emergency-contact.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEmergencyContactPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextMaskModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateEmergencyContactPage]
})
export class CreateEmergencyContactPageModule {}

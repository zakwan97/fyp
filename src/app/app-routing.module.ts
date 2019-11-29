import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'home', loadChildren: './home/home.module#HomePageModule'  },

  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },

  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard], },

  
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  {
    path: 'reset-password',
    loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule',
  },
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupPageModule',
    
  },
  { path: 'emergency', loadChildren: './emergency/emergency.module#EmergencyPageModule' },
  { path: 'emergency-details', loadChildren: './emergency-details/emergency-details.module#EmergencyDetailsPageModule' },
  { path: 'view-emergency', loadChildren: './view-emergency/view-emergency.module#ViewEmergencyPageModule' },
  { path: 'emergency-contact', loadChildren: './emergency-contact/emergency-contact.module#EmergencyContactPageModule' },
  { path: 'create-emergency-contact', loadChildren: './create-emergency-contact/create-emergency-contact.module#CreateEmergencyContactPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}



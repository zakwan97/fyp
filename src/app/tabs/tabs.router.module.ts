import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { TabsPage } from './tabs.page';



const routes: Routes = [
    {
        path : '',
        component : TabsPage,
        children : [
            //{ path: 'home', loadChildren: '../home/home.module#HomePageModule'  },
            { path: 'emergency-contact', loadChildren: '../emergency-contact/emergency-contact.module#EmergencyContactPageModule' },
            { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' },
            { path: 'emergency', loadChildren: '../emergency/emergency.module#EmergencyPageModule' },
            //{ path: 'create-emergency-contact', loadChildren: '../create-emergency-contact/create-emergency-contact.module#CreateEmergencyContactPageModule' },
        ] }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes),FormsModule,ReactiveFormsModule],
    exports: [RouterModule]
  })
  export class TabsRoutingModule { }
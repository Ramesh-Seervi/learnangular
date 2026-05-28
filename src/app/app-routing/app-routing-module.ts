import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../pages/home/home.component';
import { ServicesComponent } from '../pages/services/services.component';
import { ContactComponent } from '../pages/contact/contact.component';  
const routes : Routes = [
  { path: "", component: HomeComponent },
  { path: "services", component: ServicesComponent },
  { path: "contact", component: ContactComponent },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

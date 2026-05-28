import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from '../pages/home/home';
import { Services } from '../pages/services/services';
import { Contact } from '../pages/contact/contact';

const routes: Routes = [
  { path: "", component: Home },
  { path: "services", component: Services },
  { path: "contact", component: Contact },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


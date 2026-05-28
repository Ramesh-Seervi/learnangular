import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from '../pages/home/home';
import { Services } from '../pages/services/services';
import { Contact } from '../pages/contact/contact';
import { Login } from '../pages/login/login';

const routes: Routes = [
  { path: "", component: Home },
  { path: "services", component: Services },
  { path: "contact", component: Contact },
  { path: "login", component: Login },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


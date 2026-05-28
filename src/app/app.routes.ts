import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Dashboard } from './private/dashboard/dashboard';
import { Sales } from './private/sales/sales';
import { Customes } from './private/customes/customes';
import { Profile } from './private/profile/profile';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: "", component: Home },
  { path: "services", component: Services },
  { path: "contact", component: Contact },
  { path: "login", component: Login },
  { path: "dashboard", component: Dashboard, canActivate: [authGuard] },
  { path: "sales", component: Sales, canActivate: [authGuard] },
  { path: "customes", component: Customes, canActivate: [authGuard] },
  { path: "profile", component: Profile, canActivate: [authGuard] },
];





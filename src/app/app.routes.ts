import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Dashboard } from './private/dashboard/dashboard';

export const routes: Routes = [
  { path: "", component: Home },
  { path: "services", component: Services },
  { path: "contact", component: Contact },
  { path: "login", component: Login },
  { path: "dashboard", component: Dashboard },
];



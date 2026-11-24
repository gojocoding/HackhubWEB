import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Hackathons } from './pages/hackathons/hackathons';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'hackathons', component: Hackathons },
  { path: 'register', component: Register }
];

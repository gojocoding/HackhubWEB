import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Hackathons } from './pages/hackathons/hackathons';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'hackathons', component: Hackathons, canActivate: [authGuard] },
  { path: 'register', component: Register }
];

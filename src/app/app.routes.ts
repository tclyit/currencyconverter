import { Routes, RouterModule } from '@angular/router';

import { Home } from './home/home.component';
import { Disclaimer } from './currency';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'disclaimer', component: Disclaimer },
  { path: '**', component: Home }
];

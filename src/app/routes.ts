import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Details } from './details/details';
import { Favorites } from './favorites/favorites';

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: Details,
    title: 'Home details'
  },
  {
    path: 'favorites',
    component: Favorites,
    title: 'Favorites'
  }
];

export default routeConfig;
import {Routes} from '@angular/router';
import {Home} from '../pages/home/home';

export const routes: Routes = [
  //eagerly load home component, as this will always be displayed directly when opening the site
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  //lazy load all other pages
  {
    path: 'projects', //path to the overview of all projects
    loadComponent: () => import('../pages/projects/projects').then(m => m.Projects),
    title: 'Project Overview',
  },
  {
    path: 'projects/:id', //path to specific project
    loadComponent: () => import('../pages/projects/projects').then(m => m.Projects),
  },
  {
    path: 'contact',
    loadComponent: () => import('../pages/contact/contact').then(m => m.Contact),
    title: 'Contact',
  },
  //MUST ALWAYS BE THE LAST ITEM
  //wildcard argument in case user has inputted anything that isn't handled by routing.
  //currently redirecting to homepage, could also open a 404 page.
  {
    path: '**',
    redirectTo: ''
  }
];

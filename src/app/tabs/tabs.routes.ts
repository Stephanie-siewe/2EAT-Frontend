import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../views/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../views/search/search.page').then((m) => m.SearchPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../views/Profile/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'cart1',
        loadComponent: () => import('../views/Order/cart1/cart1.page').then( m => m.Cart1Page)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

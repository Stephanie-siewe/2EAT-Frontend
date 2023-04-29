import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'sign',
    loadComponent: () => import('./views/sign/sign.page').then( m => m.SignPage)
  },
  {
    path: 'loading',
    loadComponent: () => import('./views/loading/loading.page').then( m => m.LoadingPage)
  },
  {
    path: 'connection',
    loadComponent: () => import('./views/connection/connection.page').then( m => m.ConnectionPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./views/Profile/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'profile-edit',
    loadComponent: () => import('./views/Profile/profile-edit/profile-edit.page').then( m => m.ProfileEditPage)
  },
  {
    path: 'add-place',
    loadComponent: () => import('./views/Places/register-place/register-place.page').then( m => m.RegisterPlacePage)
  },
  {
    path: 'places-list',
    loadComponent: () => import('./views/Places/places-list/places-list.page').then( m => m.PlacesListPage)
  },
  {
    path: 'place-edit',
    loadComponent: () => import('./views/Places/place-edit/place-edit.page').then( m => m.PlaceEditPage)
  },
  {
    path: 'all-grilling',
    loadComponent: () => import('./views/Grilling/all-grilling/all-grilling.page').then( m => m.AllGrillingPage)
  },
  {
    path: 'grilling-details',
    loadComponent: () => import('./views/Grilling/grilling-details/grilling-details.page').then( m => m.GrillingDetailsPage)
  },
  {
    path: 'search',
    loadComponent: () => import('./views/search/search.page').then( m => m.SearchPage)
  },
  {
    path: 'cart1',
    loadComponent: () => import('./views/Order/cart1/cart1.page').then( m => m.Cart1Page)
  },
  {
    path: 'comments',
    loadComponent: () => import('./views/Grilling/comments/comments.page').then( m => m.CommentsPage)
  },

  {
    path: 'pwd',
    loadComponent: () => import('./views/forgotPwd/pwd/pwd.page').then( m => m.PwdPage)
  },  {
    path: 'sucess-order',
    loadComponent: () => import('./views/sucess-order/sucess-order.page').then( m => m.SucessOrderPage)
  },


];

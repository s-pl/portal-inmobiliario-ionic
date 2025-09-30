import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'property-list',
    loadChildren: () => import('./pages/property-list/property-list.module').then( m => m.PropertyListPageModule)
  },
  {
    path: 'property-form',
    loadChildren: () => import('./pages/property-form/property-form.module').then( m => m.PropertyFormPageModule)
  },
  {
    path: 'property-form/:id',
    loadChildren: () => import('./pages/property-form/property-form.module').then( m => m.PropertyFormPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

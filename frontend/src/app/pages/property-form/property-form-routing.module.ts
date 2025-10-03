import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyFormPage } from './property-form.page';

const routes: Routes = [
  {
    path: '',
    component: PropertyFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertyFormPageRoutingModule {}

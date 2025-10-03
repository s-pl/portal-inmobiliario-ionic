import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertyFormPageRoutingModule } from './property-form-routing.module';

import { PropertyFormPage } from './property-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertyFormPageRoutingModule
  ],
  declarations: [PropertyFormPage]
})
export class PropertyFormPageModule {}

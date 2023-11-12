import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrouserPageRoutingModule } from './registrouser-routing.module';

import { RegistrouserPage } from './registrouser.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrouserPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrouserPage]
})
export class RegistrouserPageModule {}

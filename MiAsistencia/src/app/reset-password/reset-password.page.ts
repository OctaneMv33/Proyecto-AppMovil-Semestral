import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage  {


    constructor(
      private toastController: ToastController
    ) {}
  
    async mostrarMensajeContrasenaCambiada() {
      const toast = await this.toastController.create({
        message: 'Contraseña cambiada exitosamente',
        duration: 2000, 
        position: 'bottom' 
      });
      
      await toast.present();
    }
  }


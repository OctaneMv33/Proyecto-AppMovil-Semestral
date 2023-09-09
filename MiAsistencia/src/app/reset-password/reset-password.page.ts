import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage  {

  email: string = '';
  contrasena: string = '';
  repetircontrasena: string = '';


  borrarCampos() {
    this.email = '';
    this.contrasena = '';
    this.repetircontrasena = '';
  }

  async animarLimpiar() {
    // ... código de animación ...
  
    // Llama a la función para borrar los campos después de la animación
    this.borrarCampos();
  }




    constructor(private toastController: ToastController) {}
  
    async mostrarMensajeContrasenaCambiada() {
      const toast = await this.toastController.create({
        message: 'Contraseña cambiada exitosamente',
        duration: 2000, 
        position: 'bottom' 
      });
      
      await toast.present();
    }
  }


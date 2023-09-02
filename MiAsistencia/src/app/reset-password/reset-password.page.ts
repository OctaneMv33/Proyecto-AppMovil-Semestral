import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  // Campos para limpiar
  email: string = '';
  password: string = '';

  constructor(
    private animationCtrl: AnimationController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Lógica de inicialización si es necesario
  }

  // Limpia los campos de email y contraseña
  limpiarCampos() {
    this.email = '';
    this.password = '';
  }

  // Realiza la animación en el título
  async animar() {
    const elementosAnimar = document.querySelectorAll('.titulo');

    const animation: Animation = this.animationCtrl.create()
      .addElement(elementosAnimar)
      .duration(1000)
      .iterations(1)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateX(0)', 'translateX(75px)');

    await animation.play();

    // Muestra el mensaje de contraseña cambiada
    this.mostrarMensajeContrasenaCambiada();
  }

  // Muestra un mensaje en la pantalla
  async mostrarMensajeContrasenaCambiada() {
    const toast = await this.toastController.create({
      message: 'Contraseña cambiada exitosamente',
      duration: 2000, 
      position: 'bottom' 
    });
    
    await toast.present();
  }
}


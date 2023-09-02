import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController,ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})

export class ResetPasswordPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private animationCtrl: AnimationController, private toastController: ToastController ) {}

  ngOnInit() {
  
  }

  async animar() {
    const elementosAnimar = document.querySelectorAll(' .titulo');

    const animation: Animation = this.animationCtrl.create()
      .addElement(elementosAnimar)
      .duration(3500)
      .iterations(Infinity)
      .keyframes([
   
        { offset: 0.5, opacity: 0.2, transform: 'translateX(100%)' },
        { offset: 0.501, opacity: 0, transform: 'translateX(-100%)' },
        { offset: 0.52, opacity: 0.2, transform: 'translateX(-100%)' }
      ]);
      
      

      animation.direction('reverse'); 

    await animation.play();

    this.mostrarMensajeContrasenaCambiada();
  }


  async mostrarMensajeContrasenaCambiada() {
    const toast = await this.toastController.create({
      message: 'Contraseña cambiada exitosamente',
      duration: 2000, // Duración en milisegundos del mensaje
      position: 'bottom' // Posición del mensaje en la pantalla (puedes ajustarlo según tus preferencias)
      
    });

    await toast.present();
  }








  limpiarCampos() {
    this.email = '';
    this.password = '';
  }
}
  



  
   
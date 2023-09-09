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

  constructor(private toastController: ToastController, private animationCtrl: AnimationController ) {}
  
    async mostrarMensajeContrasenaCambiada() {
      const toast = await this.toastController.create({
        message: 'Contraseña cambiada exitosamente',
        duration: 2000, 
        position: 'bottom' 
      });
      
      await toast.present();
    }

    async animarLimpiar() {
      const animation: Animation = this.animationCtrl.create()
        .addElement(document.querySelectorAll('.shake'))
        .duration(700)
        .keyframes([
          { offset: 0, transform: 'translateX(0)' },
          { offset: 0.1, transform: 'translateX(-5px)' },
          { offset: 0.2, transform: 'translateX(5px)' },
          { offset: 0.3, transform: 'translateX(-5px)' },
          { offset: 0.4, transform: 'translateX(5px)' },
          { offset: 0.5, transform: 'translateX(-5px)' },
          { offset: 0.6, transform: 'translateX(5px)' },
          { offset: 0.7, transform: 'translateX(-5px)' },
          { offset: 0.8, transform: 'translateX(5px)' },
          { offset: 0.9, transform: 'translateX(-5px)' },
          { offset: 1, transform: 'translateX(0)' }
        ]);
  
      animation.play();
  
      this.email = '';
      this.contrasena = '';
      this.repetircontrasena = '';
    }

    async animarContenido(){
      const animation: Animation = this.animationCtrl.create()
        .addElement(document.querySelectorAll('.tex'))
        .addElement(document.querySelectorAll('.lista'))
        .addElement(document.querySelectorAll('.boton'))
        .duration(1500)
        .keyframes([
          { offset: 0, opacity: 0.2, transform: 'translateX(-100%)' },
          { offset: 0.5, opacity: 1, transform: 'translateX(0%)' },
        ]);
        await animation.play()
    }

    ngOnInit() {
      this.animarContenido();
    }
  
  
  }


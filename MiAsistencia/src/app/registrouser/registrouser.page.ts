
import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { RegistrarUsuarioService } from '../servicios/registrar-usuario.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController} from '@ionic/angular'; 
import { Asignatura } from '../app.model';

@Component({
  selector: 'app-registrouser',
  templateUrl: './registrouser.page.html',
  styleUrls: ['./registrouser.page.scss'],
})
export class RegistrouserPage implements OnInit {
  rut: number = 0;
  dvrut : string = "";
  email: string = '';
  contrasena: string = '';
  pnombre: string = '';
  appaterno: string = '';

  formRegistro: FormGroup;

  constructor(
    private animationCtrl: AnimationController, 
    private router: Router, 
    private registrarEstudiante: RegistrarUsuarioService, 
    private alertController: AlertController) {
    this.formRegistro = new FormGroup({
      
      rut: new FormControl(''),
      dvrut: new FormControl(''),
      email: new FormControl(''),
      contrasena: new FormControl(''),
      pnombre: new FormControl(''),
      appaterno: new FormControl(''),
     })
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
    this.formRegistro.reset();
  }

  ngOnInit() {
  }
 
 registrarUsuario(): void{
    this.registrarEstudiante.RegistroEstudiante(this.formRegistro.value)
    .then(() => {
      const alert = this.alertController.create({
        header: 'Registro Exitoso',
        message: 'Usuario registrado correctamente.',
        buttons: ['Aceptar'],
      });
    })
    .catch((error) => {
      console.error('Error al registrar usuario:', error);
    });
    
  }


}









  
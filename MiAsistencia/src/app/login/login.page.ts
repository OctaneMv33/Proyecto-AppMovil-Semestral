import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { User } from '../app.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarios: User[] = [
    { id: 1, usuario: 'al.zunigam', contrasena: '1234' },
    { id: 2, usuario: 'ma.palacioso', contrasena: '1234' },
    { id: 3, usuario: 'ja.martinezq', contrasena: '1234' },
    { id: 4, usuario: 'er.galvez', contrasena: '1234' },
    { id: 5, usuario: 'ro.narbona', contrasena: '1234' }
  ];

  usuario: string = '';
  contrasena: string = '';
  
  constructor(private animationCtrl: AnimationController, private router: Router) {}
  async animarTitulo() {
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.titulo'))
      .duration(3500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: 1, transform: 'translateX(0%)' },
        { offset: 0.5, opacity: 0.2, transform: 'translateX(100%)' },
        { offset: 0.500001, opacity: 0, transform: 'translateX(-100%)' },
        { offset: 0.52, opacity: 0.2, transform: 'translateX(-100%)' }
      ]);
    await animation.play()
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
    this.usuario = '';
    this.contrasena = '';
  }

  async animarContenido(){
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.tex'))
      .addElement(document.querySelectorAll('.lista'))
      .addElement(document.querySelectorAll('.botones'))
      .duration(1500)
      .keyframes([
        { offset: 0, opacity: 0.2, transform: 'translateX(-100%)' },
        { offset: 0.5, opacity: 1, transform: 'translateX(0%)' },
      ]);
      await animation.play()
  }
  

  ingresar(){
    for (let i = 0; i < this.usuarios.length; i++) {
    const usuario = (document.getElementById('usuario') as HTMLIonInputElement).value;
    const contrasena = (document.getElementById('contrasena') as HTMLIonInputElement).value;
    let arg = usuario;

    if (usuario === this.usuarios[i].usuario){
      if (contrasena === this.usuarios[i].contrasena){
        this.router.navigate(['/home',arg]);
      } else {
        console.log('Error en el ingreso');
        } 
      } 
    }
  }

  ngOnInit() {
    this.animarTitulo();
    this.animarContenido();
  }
}

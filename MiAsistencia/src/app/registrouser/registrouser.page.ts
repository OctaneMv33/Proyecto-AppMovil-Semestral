import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RegistrarUsuarioService } from '../servicios/registrar-usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-registrouser',
  templateUrl: './registrouser.page.html',
  styleUrls: ['./registrouser.page.scss'],
})
export class RegistrouserPage implements OnInit {
  rut: number = 0;
  dvrut: string = '';
  email: string = '';
  contrasena: string = '';
  pnombre: string = '';
  appaterno: string = '';

  formRegistro: FormGroup;
  rutError: string = '';
  dvrutError: string = '';
  emailError: string = '';
  contrasenaError: string = '';
  pnombreError: string = '';
  appaternoError: string = '';

  constructor(
    private animationCtrl: AnimationController,
    private router: Router,
    private registrarEstudiante: RegistrarUsuarioService,
    private alertController: AlertController
  ) {
    this.formRegistro = new FormGroup({
      rut: new FormControl(''),
      dvrut: new FormControl(''),
      email: new FormControl(''),
      contrasena: new FormControl(''),
      pnombre: new FormControl(''),
      appaterno: new FormControl(''),
    });

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
    this.resetErrors();

  }

    validarRutExistente(rut: string, dvrut: string) {
      this.resetErrors();
  
      const esRutValido = this.validarDVRut(rut, dvrut);
  
      if (!esRutValido) {
        this.dvrutError = 'DvRut incorrecto.';
        return;
      }
  
      this.registrarEstudiante.validarRut(rut).subscribe((existe: boolean) => {
        if (existe) {
          this.rutError = 'El rut ingresado ya está registrado.';
        }
      });
    }

  calcularDVRut(rutNumerico: number): string {
    let suma = 0;
    let multiplicador = 2;

    while (rutNumerico > 0) {
      multiplicador = multiplicador > 7 ? 2 : multiplicador;
      suma += (rutNumerico % 10) * multiplicador;
      rutNumerico = Math.floor(rutNumerico / 10);
      multiplicador++;
    }

    const resto = suma % 11;
    let dvCalculado = 11 - resto;

    return dvCalculado === 0 ? 'K' : dvCalculado.toString();
  }

  validarDVRut(rut: string, dvrut: string): boolean {
    const rutSinPuntos = rut.replace(/\./g, ''); // Eliminar puntos del rut
    let rutNumerico = parseInt(rutSinPuntos, 10);

    // Cálculo del dígito verificador
    let suma = 0;
    let multiplicador = 2;

    while (rutNumerico > 0) {
      multiplicador = multiplicador > 7 ? 2 : multiplicador;
      suma += (rutNumerico % 10) * multiplicador;
      rutNumerico = Math.floor(rutNumerico / 10);
      multiplicador++;
    }

    const resto = suma % 11;
    const dvCalculado = 11 - resto === 11 ? 0 : 11 - resto;

    return dvCalculado.toString() === dvrut.toUpperCase();
  }

  validarEmailRegistrado(email: string) {
    this.emailError = '';

    this.registrarEstudiante.validarEmailRegistrado(email).subscribe((existe: boolean) => {
      if (existe) {
        this.emailError = 'El email ingresado ya está registrado.';
      }
    });
  }

  validarFormatoEmail(email: string) {
    this.emailError = '';

    if (email === '') {
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@duocuc\.cl$/;

    if (!emailRegex.test(email)) {
      this.emailError = 'Debe ser su correo institucional.';
      this.formRegistro.get('email')?.setErrors({ 'formatoEmail': true });
    } else {
      // Si cumple con el formato, limpiar el mensaje y los errores
      this.formRegistro.get('email')?.setErrors(null);
    }
  }


  ngOnInit() {
    const rutObservable = this.formRegistro.get('rut')?.valueChanges;
    const dvrutObservable = this.formRegistro.get('dvrut')?.valueChanges;
    const emailObservable = this.formRegistro.get('email')?.valueChanges;

    if (rutObservable && dvrutObservable) {
      combineLatest([rutObservable, dvrutObservable]).subscribe(([rut, dvrut]) => {
        this.validarRutExistente(rut, dvrut);
      });
    }

    if (emailObservable) {
      emailObservable.subscribe((email) => {
        this.validarEmailRegistrado(email);
        this.validarFormatoEmail(email);
      });
    }
  }

  resetErrors() {
    this.rutError = '';
    this.dvrutError = '';
    this.emailError = '';
    this.contrasenaError = '';
    this.pnombreError = '';
    this.appaternoError = '';
  }

  registrarUsuario(): void {
    this.registrarEstudiante.RegistroEstudiante(this.formRegistro.value)
      .then(() => {
        const alert = this.alertController.create({
          header: 'Registro Exitoso',
          message: 'Usuario registrado correctamente.',
          buttons: ['Aceptar'],
        });
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      });

  }


}










import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { RegistroAsistenciaService } from '../servicios/registro-asistencia.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  formulario: FormGroup;

  asignaturaOpciones: string[] = [
    'Arquitectura',
    'Calidad de Software',
    'Inglés Intermedio',
    'Portafolio Final',
    'Programación Aplicaciones Móviles'
  ];

  seccionOpciones: { [key: string]: string[] } = {
    'Arquitectura': ['ASY4131-001D', 'ASY4131-002D', 'ASY4131-003D', 'ASY4131-001V'],
    'Calidad de Software': ['CSY4111-001D', 'CSY4111-002D', 'CSY4111-003D', 'CSY4111-001V'],
    'Inglés Intermedio': ['INI5111-001D', 'INI5111-002D', 'INI5111-003D', 'INI5111-001V'],
    'Portafolio Final': ['PY41447-001D', 'PY41447-002D', 'PY41447-003D', 'PY41447-001V'],
    'Programación Aplicaciones Móviles': ['PGY4121-001D', 'PGY4121-002D', 'PGY4121-003D', 'PGY4121-001V'],
    // Define las opciones para las demás asignaturas aquí
  };

  constructor(
    private toastController: ToastController,
    private animationCtrl: AnimationController,
    private RegistroAsistenciaService: RegistroAsistenciaService,
    private afAuth: AngularFireAuth
  ) {
    this.formulario = new FormGroup({
      correo: new FormControl(''),
      fecha: new FormControl(new Date()),
      asignatura: new FormControl(''),
      seccion: new FormControl('')
    })
  }
  async animarContenido() {
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.lista'))
      .addElement(document.querySelectorAll('.boton'))
      .duration(1500)
      .keyframes([
        { offset: 0, opacity: 0.2, transform: 'translateX(-100%)' },
        { offset: 0.5, opacity: 1, transform: 'translateX(0%)' },
      ]);
    await animation.play()
  }

  async animarTitulo() {
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.titulo'))
      .duration(2500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, opacity: 1, transform: 'translateX(0%)' },
        { offset: 0.5, opacity: 0.2, transform: 'translateX(100%)' },
        { offset: 0.5001, opacity: 0, transform: 'translateX(-100%)' },
        { offset: 0.52, opacity: 0.2, transform: 'translateX(-100%)' }
      ]);
    await animation.play()
  }


  ngOnInit() {
    this.animarContenido();
    this.animarTitulo();
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // El usuario está autenticado. Puedes obtener su correo electrónico.
        const correoUsuario = user.email;
        // Ahora puedes utilizar correoUsuario en tu formulario.
        this.formulario.patchValue({ correo: correoUsuario });
      } else {
        // El usuario no está autenticado o ha cerrado sesión. Puedes manejar esto según tus necesidades.
      }
    });
  }


  onChangeAsignatura() {
    const asignaturaControl = this.formulario.get('asignatura');
    if (asignaturaControl) {
      const asignaturaSeleccionada = asignaturaControl.value;


    }
  }




  async onSubmit() {
    console.log(this.formulario.value);
    const response = await this.RegistroAsistenciaService.AddAsistencia(this.formulario.value);
    console.log(response)
  }

}

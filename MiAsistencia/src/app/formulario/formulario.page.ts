import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { RegistroAsistenciaService } from '../servicios/registro-asistencia.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  formulario: FormGroup;

  constructor(
    private toastController: ToastController, 
    private animationCtrl: AnimationController, 
    private RegistroAsistenciaService: RegistroAsistenciaService 
    ) { 
    this.formulario = new FormGroup({
      correo: new FormControl(''),
      fecha: new FormControl(''),
      asignatura: new FormControl(''),
      seccion: new FormControl('')
    })
  }
  async animarContenido(){
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
  }

  async onSubmit(){
    console.log(this.formulario.value);
    const response = await this.RegistroAsistenciaService.AddAsistencia(this.formulario.value);
    console.log(response)
  }

}

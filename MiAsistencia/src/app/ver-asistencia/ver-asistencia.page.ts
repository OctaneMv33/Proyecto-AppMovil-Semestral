import { Component, OnInit } from '@angular/core';
import { VerAsistenciaService } from '../servicios/ver-asistencia.service';
import { Asistencia } from '../app.model';
import { Router } from '@angular/router';
import { Animation, AnimationController }  from '@ionic/angular';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {

  datosAsistencia: Asistencia[] = [];
  datosAsistenciaFiltrados: Asistencia[] = [];

  constructor(
    private verAsistenciaService: VerAsistenciaService,
    private router: Router,
    private animationCtrl: AnimationController,
    private auth: Auth
  ) {}
  
  obtenerDatos() {
    this.verAsistenciaService.obtenerAsistencia().subscribe(datos => {
      this.datosAsistencia = datos.map(e => {
        return {
          asignatura: e.payload.doc.id,
          ...e.payload.doc.data() as {}
        } as Asistencia;
      });
  
      if (this.auth) {
        const usuarioActual = this.auth.currentUser?.email;
  
        this.datosAsistenciaFiltrados = this.datosAsistencia.filter(asistencia => {
          return usuarioActual === asistencia.correo;
        });
      } else {
        this.datosAsistenciaFiltrados = [];
      }
    });
  }
  /*
  obtenerDatos() {
    this.verAsistenciaService.obtenerAsistencia().subscribe(datos => {
      this.datosAsistencia = datos.map( e => {
        return{
          asignatura: e.payload.doc.id,
          ... e.payload.doc.data() as {}

        } as Asistencia;
      })
      if(this.auth){
        const usuarioActual = this.auth.currentUser?.email

        const datosFiltrados = this.datosAsistencia.filter(asistencia =>{
          return usuarioActual === asistencia.correo
        })
        return datosFiltrados
      } else {
        return [];
      }
    });
  }*/

  async animarTitulo() {
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('#tituloVerAsistencia'))
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

  home(){
    this.router.navigate(['/home']);
  }

  ngOnInit(){
    this.obtenerDatos();
    this.animarTitulo();
  }
}

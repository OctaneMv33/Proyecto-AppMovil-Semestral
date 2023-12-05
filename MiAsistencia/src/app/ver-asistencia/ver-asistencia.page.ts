import { Component, OnInit } from '@angular/core';
import { VerAsistenciaService } from '../servicios/ver-asistencia.service';
import { Asistencia } from '../app.model';
import { UsuariosService } from '../servicios/usuarios.service';
import { Animation, AnimationController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {

  banderaSinAsistencias: number = 0;
  datosAsistenciaFiltrados: Asistencia[] | null = null;
  idUsuario: string | undefined = "";
  run: string = "";

  constructor(
    private verAsistenciaService: VerAsistenciaService,
    private animationCtrl: AnimationController,
    private auth: Auth,
    private usuarioServicio: UsuariosService
  ) { }

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

  ngOnInit() {
    this.banderaSinAsistencias = 0;
    if(this.auth){
      this.idUsuario = this.auth.currentUser?.uid;
    }
    if(this.idUsuario) {
      this.usuarioServicio.datosEstudiante(this.idUsuario).subscribe((estudiante) => {
        if (estudiante) {
          this.run = estudiante.rut + "-" + estudiante.dvrut
        }
        this.verAsistenciaService.obtenerAsistencia(this.run).subscribe((asistencia) => {
          if (asistencia){
            this.banderaSinAsistencias = 1;
            this.datosAsistenciaFiltrados = asistencia
          } else {
            this.banderaSinAsistencias = 0;
          }
        }); 
      });
    }
  }


}
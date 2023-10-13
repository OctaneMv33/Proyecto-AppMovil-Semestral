import { Component, OnInit } from '@angular/core';
import { VerAsistenciaService } from '../servicios/ver-asistencia.service';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {

  datosAsistencia: any[] = [];

  constructor(
    private verAsistenciaService: VerAsistenciaService) 
    { 

    }

    obtenerDatos() {
      this.verAsistenciaService.obtenerAsistencia().subscribe(data => {
        this.datosAsistencia = data; 
        console.log(data)// Almacena los datos en la propiedad datosAsistencia
      });
    }

  ngOnInit(){
    this.obtenerDatos();
  }
}

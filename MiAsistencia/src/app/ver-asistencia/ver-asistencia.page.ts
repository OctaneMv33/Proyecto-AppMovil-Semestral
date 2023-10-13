import { Component, OnInit } from '@angular/core';
import { VerAsistenciaService } from '../servicios/ver-asistencia.service';
import { Asistencia } from '../app.model';

@Component({
  selector: 'app-ver-asistencia',
  templateUrl: './ver-asistencia.page.html',
  styleUrls: ['./ver-asistencia.page.scss'],
})
export class VerAsistenciaPage implements OnInit {

  datosAsistencia: Asistencia[] = [];

  constructor(
    private verAsistenciaService: VerAsistenciaService) 
    { 

    }

    obtenerDatos() {
      this.verAsistenciaService.obtenerAsistencia().subscribe(datos => {
        this.datosAsistencia = datos.map( e => {
          return{
            asignatura: e.payload.doc.id,
            ... e.payload.doc.data() as {}

          } as Asistencia;
        })          
        console.log(datos)// Almacena los datos en la propiedad datosAsistencia
      });
    }

  ngOnInit(){
    //this.obtenerDatos();
  }
}

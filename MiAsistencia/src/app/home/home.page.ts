import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { UsuariosService } from '../servicios/usuarios.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { RegistroAsistenciaService } from '../servicios/registro-asistencia.service';
import { Asignatura, AsignaturaSinClases, Asistencia } from '../app.model';
import { Firestore, collection, doc, getDocs, getFirestore, query, where } from '@angular/fire/firestore';
import { Estudiante } from '../app.model';
import { Auth } from '@angular/fire/auth';
import { ObtenerAsignaturaService } from '../servicios/obtener-asignatura.service';
import { Clase } from '../app.model';
import { catchError } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  dato: string | null = null;
  usuario: Estudiante | null = null;
  nombre: string | null = "";
  run: string | null = "";
  idUsuario: any;
  resultadoEscaneo = "";
  content_visibility = "show";
  asignatura: Asignatura | null = null;
  clase: Clase[] | undefined;
  sameFecha: Boolean = false;
  sameAsignatura: Boolean = false;
  asignaturasEstudiante: AsignaturaSinClases[] | null = null;

  constructor(private renderer: Renderer2, private animationCtrl: AnimationController, private router: Router,
    private usuarioServicio: UsuariosService, private obtenerAsignatura: ObtenerAsignaturaService, private auth: Auth, private firestore: Firestore, private RegistroAsistenciaService: RegistroAsistenciaService) {

  }


  //Este método anima el título que está en el header de la página
  async animarTitulo() {
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('#tituloHome'))
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

  //Este método anima los botones y texto de la página
  async animarContenido() {
    const animation: Animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.contenido'))
      .addElement(document.querySelectorAll('.logout'))
      .addElement(document.querySelectorAll('.saludo'))
      .duration(1500)
      .keyframes([
        { offset: 0, opacity: 0.2, transform: 'translateX(-100%)' },
        { offset: 0.5, opacity: 1, transform: 'translateX(0%)' },
      ]);
    await animation.play()
  }

  //Este método deberá activar la cámara cuando toque aplicar el plugin, por ahora enviará el username al qr-scan page, para luego devolverse en caso de ser necesario.

  salir() {
    this.usuarioServicio.logout()
      .then(response => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }


  ngOnInit() {
    //Al iniciar la página, aplicará las dos animaciones declaradas arriba
    this.animarTitulo()
    this.animarContenido()
    if (this.auth) {
      this.idUsuario = this.auth.currentUser?.uid;
    }
    if (this.idUsuario) {
      this.usuarioServicio.datosEstudiante(this.idUsuario).subscribe((estudiante) => {
        if (estudiante) {
          this.nombre = estudiante.pnombre + " " + estudiante.appaterno
          this.run = estudiante.rut + "-" + estudiante.dvrut
          this.asignaturasEstudiante = estudiante.asignaturas
        }
      });
    }
  }

  async checkPermission() {
    try {
      const estado = await BarcodeScanner.checkPermission({ force: true });
      if (estado.granted) {
        return true;
      } else {
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  async escanearQR() {
    //let barcodeData = "rutAl,fecha,asignaturaAl,estado";
    try {
      const permiso = await this.checkPermission();
      if (!permiso) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      const divs = document.querySelectorAll('div');
      divs.forEach(div => {
        this.renderer.addClass(div, 'hidden');
      });
      const resultado = await BarcodeScanner.startScan();
      if (this.auth) {
        const firestores = getFirestore();
        const estudiantesCollection = collection(firestores, 'estudiantes');
        const querySnapshot = getDocs(query(estudiantesCollection, where('id', '==', this.usuario)));
        console.log(querySnapshot)
      }
      if (resultado?.hasContent) {
        this.resultadoEscaneo = resultado.content;
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        divs.forEach(div => {
          this.renderer.removeClass(div, 'hidden');
        });
        //separar datos de qr por ","
        const palabras = resultado.content.split(','); //SEPARADOR LISTA QR EN "," Asignatura,sección,fecha,horaini,horafin.
        const sigla = palabras[0]
        const seccion = palabras[1]
        if(this.asignaturasEstudiante){
          for(let i = 0; i < this.asignaturasEstudiante.length; i++){
            if(sigla == this.asignaturasEstudiante[i].sigla && seccion == this.asignaturasEstudiante[i].seccion){
              this.sameAsignatura = true;
            } 
          }
        }

        if(this.sameAsignatura == false){
          this.usuarioServicio.presentToast("El ramo que intentas inscribir la asistencia no lo tienes asignado o La fecha que intentas inscribir no existe en tu ramo.");
          this.stopScan();
        }

        this.obtenerAsignatura.obtenerDetallesAsignatura(sigla, seccion).subscribe((data) => {
          if (data) {
            this.asignatura = data
            this.clase = this.asignatura.clases
            //Si ve que existe alguna clase con esa sigla, recorre el array de todas las clases que se han repartido
            if (this.clase) {
              for (let i = 0; i < this.clase.length; i++) {
                //Si es que existe esa fecha, valida la clase del dia.
                if (palabras[2] == this.clase[i].fecha) {
                  this.sameFecha = true;
                }
              }
              if (this.sameFecha == false) {
                this.usuarioServicio.presentToast("El ramo que intentas inscribir la asistencia no lo tienes asignado o La fecha que intentas inscribir no existe en tu ramo.");
                this.stopScan();
              } else if (this.sameFecha == false && this.sameAsignatura == false) {
                this.usuarioServicio.presentToast("El ramo que intentas inscribir la asistencia no lo tienes asignado o La fecha que intentas inscribir no existe en tu ramo.");
              }
              //Datos Estudiante 
              this.idUsuario = this.auth.currentUser?.uid;
              //Si es que existe el estudiante, ingresa los datos a la dbb.
              console.log(this.sameAsignatura)
              console.log(this.sameFecha)
              if (this.sameFecha && this.sameAsignatura) {
                this.usuarioServicio.datosEstudiante(this.idUsuario).subscribe((estudiante) => {
                  if (estudiante) {
                    this.nombre = estudiante.pnombre + " " + estudiante.appaterno
                    const nuevaAsistencia: Asistencia = {
                      rut: estudiante.rut + "-" + estudiante.dvrut,
                      fecha: palabras[2],
                      asignatura: palabras[0] + "-" + palabras[1],
                      estado: 'Presente'
                    };
                    const response = this.RegistroAsistenciaService.AddAsistencia(nuevaAsistencia);
                    this.usuarioServicio.presentToast("Asistencia Registrada");
                  }
                });
              } else {
                console.log("No resultó la cosa")
              }
            }
          }
        });
        //Datos obtenidos QR
        console.log(palabras[1]); // IMPRIME SEGUNDA PALABRA
        console.log("resultadoEscaneo3");
        console.log(this.resultadoEscaneo);
      }
    } catch (e) {
      console.log(e);
      this.usuarioServicio.presentToast("El QR escaneado no corresponde para registrar asistencias.");
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active')
  }

  ngOnDestroy(): void {
    this.stopScan();
  }


}

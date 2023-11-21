import { Component, OnInit, OnDestroy, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { UsuariosService } from '../servicios/usuarios.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Estudiante } from '../app.model';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  dato: string | null = null;
  usuario: Estudiante | null = null;
  nombre: string | null = "";
  idUsuario: any;
  resultadoEscaneo = "";
  content_visibility= "show";
  

  constructor(private renderer: Renderer2, private animationCtrl: AnimationController, private router: Router, 
    private usuarioServicio: UsuariosService, private auth: Auth) { 
      
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

  registrarAsistencia() {
    this.router.navigate(['/formulario']);
  }

  verAsistencia() {
    this.router.navigate(['/ver-asistencia']);
  }

  pokemon() {
    this.router.navigate(['/pokemon']);
  }

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
    if(this.auth){
      this.idUsuario = this.auth.currentUser?.uid;
    }
    if(this.idUsuario){
      this.usuarioServicio.datosEstudiante(this.idUsuario).subscribe((estudiante) => {
        if(estudiante) {
          this.nombre = estudiante.pnombre + " " + estudiante.appaterno
        }
      });
    }
  }
 
  async checkPermission() {
    try{
      const estado = await BarcodeScanner.checkPermission({ force: true });
      if(estado.granted){
        return true;
      } else {
      }
    } catch(e){
      console.log(e);
    }
    return false;
  }

  async escanearQR(){
    try {
      const permiso = await this.checkPermission(); 
      if(!permiso){
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')?.classList.add('scanner-active');
      const divs = document.querySelectorAll('div');
      divs.forEach(div => {
        this.renderer.addClass(div, 'hidden');
      });
      const resultado = await BarcodeScanner.startScan();
      console.log(resultado);
      if(resultado?.hasContent){
        this.resultadoEscaneo = resultado.content;
        BarcodeScanner.showBackground();
        document.querySelector('body')?.classList.remove('scanner-active');
        divs.forEach(div => {
          this.renderer.removeClass(div, 'hidden');
        });
        console.log(this.resultadoEscaneo);
      }
    } catch(e){
      console.log(e);
      this.stopScan();
    }
  }

  stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active')
  }

  ngOnDestroy(): void {
    this.stopScan();
  }


}

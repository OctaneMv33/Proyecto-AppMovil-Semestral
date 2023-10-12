import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  dato: string | null = null ;
  usuario: string | null = null;
  constructor(private activatedRoute: ActivatedRoute, private animationCtrl: AnimationController, private router: Router, private usuarioServicio: UsuariosService) { }

  //Este método anima el título que está en el header de la página
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

  //Este método anima los botones y texto de la página
  async animarContenido(){
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
  escanearQR(){
    this.router.navigate(['/qr-scan']);
  }

  registrarAsistencia(){
    this.router.navigate(['/formulario']);
  }

  pokemon(){
    this.router.navigate(['/pokemon']);
  }

  salir(){
    this.usuarioServicio.logout()
      .then(response =>{
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  ngOnInit() {
    //Al iniciar la página, aplicará las dos animaciones declaradas arriba
    this.animarTitulo()
    this.animarContenido()
    //Trayendo el correo que actuará como username, y reemplazamos el método que teníamos antes
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state){
      this.dato = navigation.extras.state['email'];
    }
    if(this.dato){
      const posicion = this.dato?.indexOf('@');
      this.usuario = this.dato?.substring(0,posicion);
    }
  }

/* 
  metodo activar carama 
  async escanear() {
    try {
      const image = await Camera.getPhoto({
        quality: 100, // Calidad de la imagen (0-100)
        allowEditing: false, // Permite editar la imagen después de capturarla
        resultType: CameraResultType.Base64, // Tipo de resultado (Base64)
      });

      // Aquí puedes manejar la imagen capturada, por ejemplo, mostrarla en tu aplicación
      const base64Image = 'data:image/jpeg;base64,' + image.base64String;
      console.log(base64Image);
    } catch (error) {
      console.error("Error al capturar la imagen", error);
    }
  }
  imports de capacitor 
  import { Plugins, CameraResultType } from '@capacitor/core'; // Importa el complemento Camera de Capacitor

  const { Camera } = Plugins;
  no funciona... hay que instalar comando de camara de capacitor para usarlo , pero hay un problema
  con capacitor.conf.ts
*/
}

import { Component, OnInit, OnDestroy, Renderer2  } from '@angular/core';
import { Router } from '@angular/router';
import { Animation, AnimationController } from '@ionic/angular';
import { UsuariosService } from '../servicios/usuarios.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  dato: string | null = null;
  usuario: string | null = null;
  resultadoEscaneo = "";
  content_visibility= "show";
  

  constructor(private renderer: Renderer2, private animationCtrl: AnimationController, private router: Router, 
    private usuarioServicio: UsuariosService) { 
      
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
    //Trayendo el correo que actuará como username, y reemplazamos el método que teníamos antes
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.dato = navigation.extras.state['email'];
    }
    if (this.dato) {
      const posicion = this.dato?.indexOf('@');
      this.usuario = this.dato?.substring(0, posicion);
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
  tomarFoto = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;

    // Can be set to the src of an image now

  };
 
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

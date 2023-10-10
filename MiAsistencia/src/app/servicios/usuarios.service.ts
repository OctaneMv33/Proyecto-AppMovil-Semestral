import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut ,sendPasswordResetEmail} from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private auth: Auth,private toastController: ToastController) { }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }


/**
  async cambio(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
      const toast = await this.toastController.create({
        message: 'Se ha enviado un correo electrónico para restablecer la contraseña.',
        duration: 5000,
        position: 'bottom'
      });
      await toast.present();
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'No se pudo enviar el correo electrónico para restablecer la contraseña.',
        duration: 5000,
        position: 'bottom'
      });
      await toast.present();
    }
  }
*/

}

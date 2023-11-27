import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Estudiante } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private auth: Auth, private toastController: ToastController, private firestore: Firestore) { }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }


  async resetpassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      // Envía el correo de restablecimiento solo si el correo existe en la lista
      this.presentToast('Email enviado, revisa tu correo.');
    } catch (error) {
      console.error(error);
      // Maneja errores si la actualización de la contraseña falla
      // Puedes mostrar un mensaje de error al usuario si es necesario
      this.presentToast('Ocurrió un error al enviar el correo de restablecimiento');
    }

  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000, // Duración del mensaje
      position: 'top' // Puedes ajustar la posición según tus preferencias
    });
    toast.present();
  }

  datosEstudiante(idUsuario: string): Observable<Estudiante | undefined> {
    const docEstudiante = doc(this.firestore, 'estudiantes', idUsuario);

    return new Observable<Estudiante | undefined>(observer => {
      getDoc(docEstudiante)
        .then(docSnapshot => {
          if (docSnapshot.exists()) {
            const estudianteData = docSnapshot.data();
            observer.next(estudianteData as Estudiante);
          } else {
            observer.next(undefined);
          }
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }
}
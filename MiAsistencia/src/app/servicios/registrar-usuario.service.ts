import { Injectable } from '@angular/core';
import { Estudiante } from '../app.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrarUsuarioService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { } 

  async RegistroEstudiante(estudiante : Estudiante): Promise<void>{
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(estudiante.email, estudiante.contrasena);
      if (user) {
        this.firestore.collection('estudiantes').doc(user.uid).set(estudiante)
      }
    } catch (error) { 
    console.error('Error al registrar usuario:', error);
    throw error;

    }
  }

  validarRut(rut:string): Observable<boolean>{
    return this.firestore.collection('estudiantes', (ref) => ref.where('rut','==',rut))
    .get().pipe(map((querySnapshot) => { 
      return querySnapshot.size > 0;
    }));
  }

  validarEmailRegistrado(email: string): Observable<boolean> {
    return this.firestore.collection('estudiantes', (ref) => ref.where('email', '==', email))
      .get().pipe(map((querySnapshot) => {
        return querySnapshot.size > 0;
      }));
  }


}



 

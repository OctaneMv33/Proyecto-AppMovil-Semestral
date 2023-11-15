import { Injectable } from '@angular/core';
import { Estudiante } from '../app.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

  };
}
}



 

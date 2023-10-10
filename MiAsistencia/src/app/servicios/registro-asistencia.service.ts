import { Injectable } from '@angular/core';
import { Firestore, collection , addDoc} from '@angular/fire/firestore';
import { Asistencia } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroAsistenciaService {

  constructor(private firestore: Firestore) { }

   AddAsistencia(asistencia: Asistencia){
    const asistenciaRef = collection(this.firestore,'asistencias');
    return addDoc(asistenciaRef, asistencia)
   }

}

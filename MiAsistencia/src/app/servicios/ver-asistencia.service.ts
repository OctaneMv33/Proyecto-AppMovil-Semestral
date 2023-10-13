import { Injectable  } from '@angular/core';
import { Asistencia } from '../app.model';
import { Firestore , collection , collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerAsistenciaService {

  constructor( private firestore : Firestore) { 
    
  }

  obtenerAsistencia(): Observable<Asistencia[]> {
    let asistRef = collection(this.firestore, 'asistencias');
    return collectionData(asistRef, { idField: 'id'}) as Observable<Asistencia[]>;
  }

}

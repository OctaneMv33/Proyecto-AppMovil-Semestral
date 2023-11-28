import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { Asistencia } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class VerAsistenciaService {

  constructor(private firestore: Firestore) {}

  
  obtenerAsistencia(rut: string): Observable<Asistencia[]> {
    const asistenciasCollection = collection(this.firestore, 'asistencias');
    const asistenciaQuery = query(asistenciasCollection, where('rut', '==', rut));

    return new Observable<Asistencia[]>(observer => {
      getDocs(asistenciaQuery).then(snapshot => {
        const asistencias: Asistencia[] = snapshot.docs.map(doc =>{
          const data = doc.data() as Asistencia;
          const id = doc.id;
          return { ...data, id }
        });
        observer.next(asistencias)
        observer.complete();
      }).catch(error =>{
        observer.error(error);
      });
    });

  }


}

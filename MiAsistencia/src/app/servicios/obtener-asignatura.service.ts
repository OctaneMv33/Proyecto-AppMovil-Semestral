import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, where } from '@angular/fire/firestore';
import { Asignatura } from '../app.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ObtenerAsignaturaService {
  constructor(private firestore: Firestore) { }
  obtenerDetallesAsignatura(siglaAsignatura: string, seccionAsignatura: string): Observable<Asignatura | null> {
    console.log("siglaAsignatura")
    const asignaturaCollection = collection(this.firestore, 'asignatura');
    console.log(siglaAsignatura)
    const asignaturaQuery = query(asignaturaCollection, where('sigla', '==', siglaAsignatura), where('seccion', '==', seccionAsignatura));
    console.log("asignaturaQuery")
    console.log(asignaturaQuery)
    //where('seccion', '==', seccionAsignatura)
    return new Observable<Asignatura | null>((observer) => {
      getDocs(asignaturaQuery)
        .then((snapshot) => {
          if (snapshot.docs.length > 0) {
            const asignatura = snapshot.docs[0].data() as Asignatura;
            observer.next(asignatura);
          } else {
            observer.next(null); // No se encontró la tienda
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}


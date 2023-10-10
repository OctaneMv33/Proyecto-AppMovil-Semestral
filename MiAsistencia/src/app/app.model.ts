import { Timestamp } from "firebase/firestore";

export interface User{
    rut: number;
    dvrut: string;
    email: string;
    contrasena: string;
}

export interface Asistencia {
    correo: string;
    fecha: Timestamp;
    asignatura: string;
    seccion: string;
}
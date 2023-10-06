import { Timestamp } from "firebase/firestore";

export interface User{
    id: number;
    usuario: string;
    contrasena: string;
}

export interface Asistencia {
    correo: string;
    fecha: Timestamp;
    asignatura: string;
    seccion: string;
}
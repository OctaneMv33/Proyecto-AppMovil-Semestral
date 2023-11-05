export interface Estudiante{
    rut: number;
    dvrut: string;
    email: string;
    contrasena: string;
    pnombre: string;
    appaterno: string;
    asignaturas: Asignatura[];
}

export interface Asistencia {
    rut: string;
    fecha: string;
    asignatura: string;
    seccion: string;
}

export interface Clase{
    fecha: string;
    horaIni: string;
    horaFin: string;
    estado: number;
}

export interface Asignatura{
    sigla: string;
    seccion: string;
    clases: Clase[];
}
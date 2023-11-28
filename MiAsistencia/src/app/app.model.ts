export interface Estudiante{
    rut: number;
    dvrut: string;
    email: string;
    contrasena: string;
    pnombre: string;
    appaterno: string;
    asignaturas: AsignaturaSinClases[];
}

export interface Asistencia {
    rut: string;
    fecha: string;
    asignatura: string;
    estado: string;
}

export interface Clase{
    fecha: string;
    horaIni: string;
    horaFin: string;
}

export interface Asignatura{
    sigla: string;
    seccion: string;
    clases: Clase[];
}

export interface AsignaturaSinClases{
    sigla: string;
    seccion: string;
}
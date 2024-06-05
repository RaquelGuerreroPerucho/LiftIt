import { Time } from "@angular/common";

// training.model.ts
export interface Entrenamiento {
    id: string;
    calentamiento: string;
    core: string;
    duracion: string;
    ejerComplementarios: string;
    ejerPrincipales: string;
    enfriamiento: string;
    estado: boolean;
    fecha: Date;
    hora: string;
    intensidad: string;
    sensacion: string;
    titulo: string;
    idCalendar: string;
    idUser: string;
}

function logTraining(training: Entrenamiento) {
    console.log(`id: ${training.id}`);
    console.log(`calentamiento: ${training.calentamiento}`);
    console.log(`core: ${training.core}`);
    console.log(`duracion: ${training.duracion}`);
    console.log(`ejerComplementarios: ${training.ejerComplementarios}`);
    console.log(`ejer_Principales: ${training.ejerPrincipales}`);
    console.log(`enfriamiento: ${training.enfriamiento}`);
    console.log(`estado: ${training.estado}`);
    console.log(`fecha: ${training.fecha}`);
    console.log(`hora: ${training.hora}`);
    console.log(`intensidad: ${training.intensidad}`);
    console.log(`sensacion: ${training.sensacion}`);
    console.log(`titulo: ${training.titulo}`);
    console.log(`calendar_id: ${training.idCalendar}`);
    console.log(`user_id: ${training.idUser}`);
}
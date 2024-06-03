import { Time } from "@angular/common";

// training.model.ts
export interface Entrenamiento {
    id: string;
    descripcion: string;
    duracion: Time;
    estado: boolean;
    fecha: Date;
    intensidad : string;
    sensacion: string;
    user_id: string;
    calendar_id: string;
    calentamiento : string;
    core :     string;
    ejer_complementarios : string;
    ejer_principales : string;
    enfriamiento : string;
  // Agrega aquí los demás campos que necesites
  
}

function logTraining(training: Entrenamiento) {
    console.log(`id: ${training.id}`);
    console.log(`descripcion: ${training.descripcion}`);
    console.log(`duracion: ${training.duracion}`);
    console.log(`estado: ${training.estado}`);
    console.log(`fecha: ${training.fecha}`);
    console.log(`intensidad: ${training.intensidad}`);
    console.log(`sensacion: ${training.sensacion}`);
    console.log(`user_id: ${training.user_id}`);
    console.log(`calendar_id: ${training.calendar_id}`);
    console.log(`calentamiento: ${training.calentamiento}`);
    console.log(`core: ${training.core}`);
    console.log(`ejerComplementarios: ${training.ejer_complementarios}`);
    console.log(`ejerPrincipales: ${training.ejer_principales}`);
    console.log(`enfriamiento: ${training.enfriamiento}`);
    // Agrega aquí los demás campos que necesites
}
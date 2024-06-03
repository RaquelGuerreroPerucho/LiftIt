export enum Role {
  // Define tus roles aquí
}

export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  preguntaSeguridad: string;
  respuestaSeguridad: string;
  role: Role;
}

function logUser(user: User) {
  console.log(`id: ${user.id}`);
  console.log(`email: ${user.email}`);
  console.log(`username: ${user.username}`);
  console.log(`password: ${user.password}`);
  console.log(`preguntaSeguridad: ${user.preguntaSeguridad}`);
  console.log(`respuestaSeguridad: ${user.respuestaSeguridad}`);
  console.log(`role: ${user.role}`);
}

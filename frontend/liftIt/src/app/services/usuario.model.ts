export enum Role {
  // Define tus roles aquí
}

export interface Usuario
 {
  id: string;
  email: string;
  username: string;
  password: string;
}

function logUser(user: Usuario) {
  console.log(`id: ${user.id}`);
  console.log(`email: ${user.email}`);
  console.log(`usname: ${user.username}`);
  console.log(`password: ${user.password}`);
}

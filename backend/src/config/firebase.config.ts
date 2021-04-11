import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from "../config/serviceAccountKey.json";

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.APP_DATABASE_URL
});

export const admin = firebaseAdmin;
export const firebaseDatabase = firebaseAdmin.database();
export const documentBlocoRef = firebaseDatabase.ref('/bloco');
export const documentUsersRef = firebaseDatabase.ref('/usuarios');
export const documentAgendamentosRef = firebaseDatabase.ref('/agendamento');


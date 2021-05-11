import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from '../config/serviceAccountKey.json';

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.APP_DATABASE_URL
});

export const firebaseAdminInstance = firebaseAdmin;
export const firebaseDatabase = firebaseAdmin.database();


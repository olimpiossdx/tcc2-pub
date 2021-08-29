import { initializeApp } from "firebase/app"
import 'firebase/auth';

import firebaseConfig from './firebase.config';

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };

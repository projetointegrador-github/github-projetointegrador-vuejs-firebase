import { initializeApp } from '@firebase/app';
import { getFirestore, collection } from '@firebase/firestore'

const app = initializeApp({
    apiKey: "AIzaSyBrZavfVmhrLOCLZAtkeTaNWy4QKbNBORA",
    authDomain: "projetointegrador-efcc4.firebaseapp.com",
    projectId: "projetointegrador-efcc4",
    storageBucket: "projetointegrador-efcc4.appspot.com",
    messagingSenderId: "28913621261",
    appId: "1:28913621261:web:b278b862c9b4eaaf53b844"
});
const db = getFirestore();
export const camisetasCollection = collection(db, 'camisetas');

export default { app, db, camisetasCollection }
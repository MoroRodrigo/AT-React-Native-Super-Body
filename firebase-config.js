import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyChnTjj3oeelZYWjNdtrYiw0KlaAnyxAAo",
    authDomain: "acme-pb.firebaseapp.com",
    projectId: "acme-pb",
    storageBucket: "acme-pb.appspot.com",
    messagingSenderId: "1080723986334",
    appId: "1:1080723986334:web:19f2f80bbc91163525a88f"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exportar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBnk8tGAX16Iaz-Cl47VpJi2wjYHjlZpGg',
  authDomain: 'c12-40-ft.firebaseapp.com',
  projectId: 'c12-40-ft',
  storageBucket: 'c12-40-ft.appspot.com',
  messagingSenderId: '467734432296',
  appId: '1:467734432296:web:68c1e2484146366c8b831d',
  measurementId: 'G-4X4J83N3T6'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {
  auth,
  db
}

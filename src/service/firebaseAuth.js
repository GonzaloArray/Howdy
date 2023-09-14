import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    const docRef = doc(db, 'users', userCredential.user.uid)
    const docSnap = await getDoc(docRef)

    const userRef = doc(db, 'online', userCredential?.user?.uid)
    await setDoc(userRef, {
      online: true
    })

    if (userCredential.user) {
      const userFirebase = {
        name: userCredential?.user.displayName,
        uid: userCredential?.user.uid,
        email: userCredential?.user.email,
        photo: userCredential?.user.photoURL,
        auth: docSnap.data()?.auth
      }

      return { success: true, userFirebase }
    }
  } catch (error) {
    return { error: 'Bad user credentials' }
  }
}

export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user

    await updateProfile(user, {
      displayName: name
    })

    await setDoc(doc(db, 'users', user.uid), {
      email,
      name,
      token: false,
      timestamp: serverTimestamp()
    })

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    const userFirebase = {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      photo: user.photoURL,
      auth: docSnap.data().token
    }

    return { success: true, userFirebase }
  } catch (error) {
    return { error: 'Something went wrong with the registration' }
  }
}

export const onGoogleAuth = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    let authentication = false

    if (docSnap.exists()) {
      authentication = docSnap.data().auth
      const userRef = doc(db, 'online', user.uid)
      await setDoc(userRef, {
        online: true
      })
    } else {
      authentication = false
    }

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        token: authentication,
        timestamp: serverTimestamp()
      })
    }

    const userFirebase = {
      name: user.displayName,
      uid: user.uid,
      email: user.email,
      photo: user.photoURL,
      auth: authentication
    }

    return { success: true, userFirebase }
  } catch (error) {
    return { error: 'Something went wrong with the registration with Google' }
  }
}

export const onAuthenticatedAutomatic = async () => {
  try {
    const user = await new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user)
      }, reject)
    })

    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    const userRef = doc(db, 'online', user.uid)
    await setDoc(userRef, {
      online: true
    })

    if (user) {
      const userFirebase = {
        name: user.displayName,
        uid: user.uid,
        email: user.email,
        photo: user.photoURL,
        auth: docSnap.data().auth
      }
      return { success: true, userFirebase }
    } else {
      throw new Error('Error de autenticación de usuario')
    }
  } catch (error) {
    if (error.message === 'Error de autenticación de usuario') {
      return { error: error.message }
    } else {
      return { success: false }
    }
  }
}

export const onLogout = async (id) => {
  const userRef = doc(db, 'online', id)
  await updateDoc(userRef, {
    online: false
  })

  auth.signOut()
}

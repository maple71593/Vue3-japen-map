import { getFirestore, collection } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { VueFire, VueFireAuth } from 'vuefire'
export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyC-sM90WGh5RBc18uViYJS0-b2DbTwEuzY',
  authDomain: 'fir-test-a43df.firebaseapp.com',
  projectId: 'fir-test-a43df',
  storageBucket: 'fir-test-a43df.appspot.com',
  messagingSenderId: '80896090227',
  appId: '1:80896090227:web:dc5814ea6761aac3848a06',
  measurementId: 'G-2SSX4HNBTW'
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')
const firebase =
  (VueFire,
  {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth()
    ]
  })
export default firebase

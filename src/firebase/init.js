import firebaseConfig from './.firebaseConfig.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Firebaseをイニシャライズ
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const login = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  // 他のスコープ(権限)にアクセスしたい場合 https://developers.google.com/identity/protocols/googlescopes?hl=ja
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  firebase.auth().useDeviceLanguage()
  return firebase.auth().signInWithPopup(provider)
}

export { login, db, firebase}
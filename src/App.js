import "./App.css"
import React from "react"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2P5bidAYcHepHKnXP5o-p_ka49PEH9kU",
  authDomain: "simplesaasproject.firebaseapp.com",
  projectId: "simplesaasproject",
  storageBucket: "simplesaasproject.appspot.com",
  messagingSenderId: "522927849476",
  appId: "1:522927849476:web:ab30f2aa6d42aae1e93551",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userData, setUserData] = React.useState(null)

  function loginWithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { user } = result
        if (user) {
          // do the logging in
          const { displayName, email } = user
          const userData = {
            displayName,
            email,
          }
          setUserData(userData)
          setIsLoggedIn(true)
        }
      })
      .catch((err) => console.log(err.message))
  }

  function logout() {
    signOut(auth).then(() => {
      setUserData(null)
      setIsLoggedIn(false)
    })
  }

  return (
    <div className="App">
      <h1>My Saas App Dashboard</h1>
      {isLoggedIn ? (
        <AuthenticatedArea userData={userData} handleSignOut={logout} />
      ) : (
        <UnAuthenticatedArea loginFn={loginWithGoogle} />
      )}
    </div>
  )
}

function UnAuthenticatedArea({ loginFn }) {
  return (
    <>
      <button onClick={loginFn} type="button">
        Continue with Google
      </button>
    </>
  )
}

function AuthenticatedArea({ userData, handleSignOut }) {
  return (
    <>
      <p>Welcome to your dashboard. {userData.displayName}</p>
      <button onClick={handleSignOut} type="submit">
        Sign Out
      </button>
    </>
  )
}

export default App

import logo from './logo.svg';
import './App.css';
import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Router } from './components/router';

function App() {
  const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			setUser(user); //updates the user whenever it changes
		});
  }, []);

  const signUp = () => {
    setError("");
		const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .catch(err => {
      if (err.code == "auth/weak-password") {
        setError("Please user a longer password")
      }
      else if (err.code == "auth/invalid-email") {
        setError("That email address is not valid")
      }
      else if (err.code == "auth/email-already-in-use") {
        setError("That email address is already used")
      }
      else {
        setError("Unexpected error: " + err.message);
      }
    });
  }

  const signIn = () => {
    setError("");
		const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .catch(err => {
      if (err.code == "auth/user-not-found") {
        setError("User not found, please Sign Up first")
      }
      else if (err.code == "auth/invalid-email") {
        setError("That email address is not valid")
      }
      else {
        setError("Unexpected error: " + err.message);
      }
    });
	}
	
	const logOut = () => {
		const auth = getAuth();
		signOut(auth);
  }

  return (
    <HashRouter>
      <Router />
    </HashRouter>
  );
}

export default App;
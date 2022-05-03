import {getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const SignIn = () => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Sign In - Hero Sheet"

		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			setUser(user); //updates the user whenever it changes
      setLoadingAuth(false);
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

  if (loadingAuth) {
    return <div>Loading, please wait</div>;
  }

  return (
    <div>
      {!user && (
        <div>
          <div>Email</div>
          <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
          <div>Password</div>
          <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
          <button type="button" onClick={signIn}>Sign in</button>
          <button type="button" onClick={signUp}> Sign Up </button>
        </div>
      )}
      {error && (
        <div>
          { error }
        </div>
      )}
      {user && (
				<div>
          <Navigate push to={"/"}/>
				</div>
			)}
    </div>
  );
}
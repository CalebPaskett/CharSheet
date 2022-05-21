import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const SignIn = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [eError, setEError] = useState(false);
  const [pError, setPError] = useState(false);

  useEffect(() => {
    document.title = "Sign In - Hero Sheet"

		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			setUser(user); //updates the user whenever it changes
      setLoading(false);
		});
  }, []);

  const signUp = () => {
    setError("");
    setEError(false);
    setPError(false);

		const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .catch(err => {
      if (err.code === "auth/weak-password") {
        setError("Password Too Short");
        setPError(true);
      }
      else if (err.code === "auth/invalid-email") {
        setError("Invalid Email Address");
        setEError(true);
      }
      else if (err.code === "auth/email-already-in-use") {
        setError("Email Already User");
        setEError(true);
      }
      else {
        setError("Unexpected Error: " + err.message);
      }
    });
  }

  const signIn = () => {
    setError("");
    setEError(false);
    setPError(false);

		const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .catch(err => {
      if (err.code === "auth/user-not-found") {
        setError("User Not Found");
        setEError(true);
      }
      else if (err.code === "auth/invalid-email") {
        setError("Invalid Email Address");
        setEError(true);
        console.log(eError)
      }
      else if (err.code === "auth/wrong-password") {
        setError("Incorrect Password");
        setPError(true);
      }
      else {
        setError("Unexpected Error: " + err.message);
      }
    });
	}

  if (loading) {
    return (
      <div className='loading'>
        <div className='loader'></div>
      </div>
    )
  }

  return (
    <div className="login-box">
      {!user && (
        <div>
          <input type="email" className={eError ? 'invalid login' : 'login'} placeholder="Email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
          <br/>
          <input type="password" className={pError ? 'invalid login' : 'login'} placeholder="Password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
          <br/>
          <button type="button" className='login button' onClick={signIn}>Sign in</button>
          <button type="button" className='login button' style={{marginBottom: "0px"}}onClick={signUp}>Sign Up</button>
        </div>
      )}
      {error && (
        <div className='error'>
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
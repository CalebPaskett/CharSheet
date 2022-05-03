import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './home/home';
import { Skills } from './tabs/skills'
import { SignIn } from './sign_in/sign_in';

export const Router = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			setUser(user); //updates the user whenever it changes
		});
  }, []);

  return (
    <Routes>
      <Route
        path="/*"
        element={user ? <Home /> : <Navigate replace to="signin" />}
      />
      <Route path="signin" element={<SignIn />} />
    </Routes>
  );
};
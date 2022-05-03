import { useEffect, useState, useRef } from 'react';
import {doc, addDoc, setDoc, collection, onSnapshot, getDocs, getFirestore, deleteDoc} from "firebase/firestore";
import { reload } from 'firebase/auth';

export const Settings = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
		setLoading(false);
  }, []);

  const deleteCharacter = async () => {
    const db = getFirestore();
    await deleteDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id));
    window.location.reload();
  }

  if (loading) {
    return <div>Loading, please wait</div>;
  }

  return (
      <div>
        <button type="button" className='button' onClick={deleteCharacter}>DELETE CHARACTER</button>
      </div>
  );
}
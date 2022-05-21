import { useEffect, useState } from 'react';
import { doc, getFirestore, deleteDoc } from "firebase/firestore";

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
    return <div></div>;
  }

  return (
      <div>
        <button type="button" className='button' onClick={deleteCharacter}>DELETE CHARACTER</button>
      </div>
  );
}
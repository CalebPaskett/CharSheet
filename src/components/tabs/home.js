import { getAuth, } from 'firebase/auth';
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import { useEffect } from 'react';

export const Home = (props) => {
  useEffect(() => {
    document.title = ("Hero Sheet");
  }, []);

  const delAccount = async () => {
    const db = getFirestore();
    const user = getAuth().currentUser;

    for (let character of props.characters) {
      await deleteDoc(doc(db, ("users/"+user.uid+"/characters"), character.id));
    }

    await deleteDoc(doc(db, ("users/"), user.uid));

    console.log(user.delete());
  }

  return (
    <div>
      <div>Select a character from the sidebar</div>

      <div>Dev TODO:</div>
      <ul>
        <li>Fix account deletion</li>
        <li>Make home pretty</li>
        <li>Organize sidebar button</li>
        <li>Dice roller</li>
        <li>Assorted tools</li>
        <li>Action page</li>
        <li>Password changing/recovery</li>
        <li>Retain info after refresh</li>
        <li>Character photos</li>
        <li>Make about/characteristics pretty</li>
      </ul>

      <button type="button" className="button" onClick={delAccount}>Delete Account</button>
    </div>
  )
}

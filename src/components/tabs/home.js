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
        <li>Research hdc exports more</li>
        <li>Dice roller</li>
        <li>Assorted tools</li>
        <li>Action page</li>
        <li>Password changing/recovery</li>
        <li>Retain info after refresh</li>
        <li>Character photos</li>
        <li>Make about/characteristics pretty</li>
        <li>Add character/power etc reording</li>
        <li>Troubleshoot dev overload</li>
        <li>Martial can be unique martial element</li>
        <li>Need equipments</li>
        <li>Need to have parser set missing fields to false so I can skip undefined checks</li>
        <li>Edit Minor Cards</li>
        <li>Finish improving parser, need to add defaults, better separator handling</li>
      </ul>

      <button type="button" className="button" onClick={delAccount}>Delete Account</button>
    </div>
  )
}

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, getFirestore, updateDoc, arrayRemove } from "firebase/firestore";

export const ComplicationCard = (props) => {
  const [saveStat, setSaveStat] = useState("Save");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    setName(props.complication.name);
    setDesc(props.complication.notes);
  }, [props]);

  const saveChanges = async () => {
    setSaveStat("Saving...");

    var changed = {
			name: name,
      notes: desc,
    }

    const db = getFirestore();

    let character = await getDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId));
    var newArray = character.data().complications;
    newArray[props.index] = changed;

    await setDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
			complications: newArray,
    }, {merge: true})

    setSaveStat("Saved!");
    setTimeout(function() {setSaveStat("Save");}, 500);
  }

  const deleteComplication = async () => {
    const db = getFirestore();

    await updateDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
      complications: arrayRemove(props.complication),
    });
  }

  return (
    <div className='card'>
      <input type="text" value={name} onChange={(e) =>setName(e.target.value)}/><br/>
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)}/>
      <button type="button" className='card-save button' onClick={saveChanges}>{saveStat}</button>
      <button type="button" className='card-delete' onClick={deleteComplication}>X</button>
    </div>
  );
}
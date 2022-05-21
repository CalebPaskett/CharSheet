import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, getFirestore, updateDoc, arrayRemove } from "firebase/firestore";

export const TalentCard = (props) => {
  const [saveStat, setSaveStat] = useState("Save");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    setName(props.talent.name);
    setDesc(props.talent.description);
  }, [props]);

  const saveChanges = async () => {
    setSaveStat("Saving...");

    var changed = {
			name: name,
      description: desc,
    }

    const db = getFirestore();

    let character = await getDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId));
    var newArray = character.data().talents;
    newArray[props.index] = changed;

    await setDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
			talents: newArray,
    }, {merge: true})

    setSaveStat("Saved!");
    setTimeout(function() {setSaveStat("Save");}, 500);
  }

  const deleteTalent = async () => {
    const db = getFirestore();

    await updateDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
      talents: arrayRemove(props.talent),
    });
  }

  return (
    <div className='card'>
      <input type="text" value={name} onChange={(e) =>setName(e.target.value)}/><br/>
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)}/>
      <button type="button" className='card-save button' onClick={saveChanges}>{saveStat}</button>
      <button type="button" className='card-delete' onClick={deleteTalent}>X</button>
    </div>
  );
}
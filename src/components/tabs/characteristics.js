import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore} from "firebase/firestore";

export const Characteristics = (props) => {
  const [loading, setLoading] = useState(true);
  const [saveStat, setSaveStat] = useState("Save Changes");

  const [characteristics, setCharacteristics] = useState(null);

  useEffect(() => {
    document.title = (props.character.about.name + " / Characteristics - Hero Sheet");

    setCharacteristics(props.character.characteristics);

		setLoading(false);
  }, [props.character]);

  const saveChanges = async () => {
    setSaveStat("Saving...")

    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
			characteristics: characteristics,
    }, {merge: true})

    setSaveStat("Saved!");
    setTimeout(function() {setSaveStat("Save Changes");}, 500);
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        <div>STR: <input type="text" value={characteristics.str} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, str: e.target.value}))}/></div>
        
        <div>DEX: <input type="text" value={characteristics.dex} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, dex: e.target.value}))}/></div>

        <div>CON: <input type="text" value={characteristics.con} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, con: e.target.value}))}/></div>

        <div>INT: <input type="text" value={characteristics.int} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, int: e.target.value}))}/></div>

        <div>EGO: <input type="text" value={characteristics.ego} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, ego: e.target.value}))}/></div>

        <div>OCV: <input type="text" value={characteristics.ocv} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, ocv: e.target.value}))}/></div>

        <div>DCV: <input type="text" value={characteristics.dcv} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, dcv: e.target.value}))}/></div>

        <div>OMCV: <input type="text" value={characteristics.omcv} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, omcv: e.target.value}))}/></div>

        <div>DMCV: <input type="text" value={characteristics.dmcv} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, dmcv: e.target.value}))}/></div>

        <div>SPD: <input type="text" value={characteristics.spd} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, spd: e.target.value}))}/></div>

        <div>PD: <input type="text" value={characteristics.pd} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, pd: e.target.value}))}/></div>

        <div>ED: <input type="text" value={characteristics.ed} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, ed: e.target.value}))}/></div>

        <div>REC: <input type="text" value={characteristics.rec} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, rec: e.target.value}))}/></div>

        <div>END: <input type="text" value={characteristics.end} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, end: e.target.value}))}/></div>

        <div>BODY: <input type="text" value={characteristics.body} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, body: e.target.value}))}/></div>

        <div>STUN: <input type="text" value={characteristics.stun} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, stun: e.target.value}))}/></div>

        <div>RUNNING: <input type="text" value={characteristics.running} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, running: e.target.value}))}/></div>

        <div>SWIMMING: <input type="text" value={characteristics.swimming} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, swimming: e.target.value}))}/></div>

        <div>LEAPING: <input type="text" value={characteristics.leaping} onChange={(e) => setCharacteristics(oldCharacteristics => ({...oldCharacteristics, leaping: e.target.value}))}/></div>

        <button type="button" className="save button" onClick={saveChanges}>{saveStat}</button>
      </div>
  );
}
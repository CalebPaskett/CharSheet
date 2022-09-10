import { useEffect, useState } from 'react';
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { CharacteristicEditCard } from '../cards/characteristic_edit_card';

export const CharacteristicsModal = (props) => {
  const [tempCharacteristics, setTempCharacteristics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTempCharacteristics(props.characteristics);
    setLoading(false);
  }, [props.characteristics]);

  const saveChanges = async () => {
    setLoading(true);

    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.uid+"/characters"), props.charId), {
			characteristics: tempCharacteristics,
    }, {merge: true})

    props.closeModal();
  }

  const setChar = (char, subChar, value) => {
    setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, [char]: ({...oldCharacteristics[char], [subChar]: value})}));
  }

  const setSubChar = (char, subChar, subSubChar, value) => {
    setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, [char]: ({...oldCharacteristics[char], [subChar]: ({...oldCharacteristics[subChar], [subSubChar]: value})})}));
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="modal-container">
          <div className="overlay" onClick={() => (props.closeModal())}/>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
          <header>
            <h3 className='modal-header'>Editing Characteristics</h3>
          </header>

            <CharacteristicEditCard name="STR" char="str" values={tempCharacteristics.str} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="DEX" char="dex" values={tempCharacteristics.dex} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="INT" char="int" values={tempCharacteristics.int} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="EGO" char="ego" values={tempCharacteristics.ego} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="OCV" char="ocv" values={tempCharacteristics.ocv} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="DCV" char="dcv" values={tempCharacteristics.dcv} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="OMCV" char="omcv" values={tempCharacteristics.omcv} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="DMCV" char="dmcv" values={tempCharacteristics.dmcv} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="SPD" char="spd" values={tempCharacteristics.spd} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="PD" char="pd" values={tempCharacteristics.pd} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="ED" char="ed" values={tempCharacteristics.ed} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="REC" char="rec" values={tempCharacteristics.rec} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="END" char="end" values={tempCharacteristics.end} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="BODY" char="body" values={tempCharacteristics.body} setChar={setChar} setSubChar={setSubChar}/>
            <CharacteristicEditCard name="STUN" char="stun" values={tempCharacteristics.stun} setChar={setChar} setSubChar={setSubChar}/>

            <div>RUNNING: <input type="number" value={tempCharacteristics.movement.running.value} onChange={(e) => setSubChar("movement", "running", "value", e.target.value)}/></div>

            <div>SWIMMING: <input type="number" value={tempCharacteristics.movement.swimming.value} onChange={(e) => setSubChar("movement", "swimming", "value", e.target.value)}/></div>

            <div>LEAPING: <input type="number" value={tempCharacteristics.movement.leaping.value} onChange={(e) => setSubChar("movement", "leaping", "value", e.target.value)}/></div>

            <div>
              <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
              <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
            </div>
          </div>
        </div>
  );
}
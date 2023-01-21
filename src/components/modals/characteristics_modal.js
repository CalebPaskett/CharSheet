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

  const setChar = (path, value) => {
    if (path.length === 2) {
      setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, [path[0]]: ({...oldCharacteristics[path[0]], [path[1]]: value})}));
    }
    else if (path.length === 3) {
      setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, [path[0]]: ({...oldCharacteristics[path[0]], [path[1]]: ({...oldCharacteristics[path[0]][path[1]], [path[2]]: value})})}));
    }
    else if (path.length === 4) {
      setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, [path[0]]: ({...oldCharacteristics[path[0]], [path[1]]: ({...oldCharacteristics[path[0]][path[1]], [path[2]]: ({...oldCharacteristics[path[0]][path[1]][path[2]], [path[3]]: value})})})}));
    }
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

            <CharacteristicEditCard name="STR"  char={["str"]}  values={tempCharacteristics.str}  setChar={setChar}/>
            <CharacteristicEditCard name="DEX"  char={["dex"]}  values={tempCharacteristics.dex}  setChar={setChar}/>
            <CharacteristicEditCard name="INT"  char={["int"]}  values={tempCharacteristics.int}  setChar={setChar}/>
            <CharacteristicEditCard name="EGO"  char={["ego"]}  values={tempCharacteristics.ego}  setChar={setChar}/>
            <CharacteristicEditCard name="OCV"  char={["ocv"]}  values={tempCharacteristics.ocv}  setChar={setChar}/>
            <CharacteristicEditCard name="DCV"  char={["dcv"]}  values={tempCharacteristics.dcv}  setChar={setChar}/>
            <CharacteristicEditCard name="OMCV" char={["omcv"]} values={tempCharacteristics.omcv} setChar={setChar}/>
            <CharacteristicEditCard name="DMCV" char={["dmcv"]} values={tempCharacteristics.dmcv} setChar={setChar}/>
            <CharacteristicEditCard name="SPD"  char={["spd"]}  values={tempCharacteristics.spd}  setChar={setChar}/>
            <CharacteristicEditCard name="PD"   char={["pd"]}   values={tempCharacteristics.pd}   setChar={setChar}/>
            <CharacteristicEditCard name="ED"   char={["ed"]}   values={tempCharacteristics.ed}   setChar={setChar}/>
            <CharacteristicEditCard name="REC"  char={["rec"]}  values={tempCharacteristics.rec}  setChar={setChar}/>
            <CharacteristicEditCard name="END"  char={["end"]}  values={tempCharacteristics.end}  setChar={setChar}/>
            <CharacteristicEditCard name="BODY" char={["body"]} values={tempCharacteristics.body} setChar={setChar}/>
            <CharacteristicEditCard name="STUN" char={["stun"]} values={tempCharacteristics.stun} setChar={setChar}/>

            <CharacteristicEditCard name="RUNNING" char={["movement", "running"]} values={tempCharacteristics.movement.running} setChar={setChar}/>
            <CharacteristicEditCard name="SWIMMING" char={["movement", "swimming"]} values={tempCharacteristics.movement.swimming} setChar={setChar}/>
            <CharacteristicEditCard name="LEAPING" char={["movement", "leaping"]} values={tempCharacteristics.movement.leaping} setChar={setChar}/>

            <div>
              <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
              <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
            </div>
          </div>
        </div>
  );
}
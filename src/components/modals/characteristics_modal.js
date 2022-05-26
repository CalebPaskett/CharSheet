import { useEffect, useState } from 'react';
import { doc, setDoc, getFirestore } from "firebase/firestore";

export const CharacteristicsModal = (props) => {
  const [tempCharacteristics, setTempCharacteristics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTempCharacteristics(props.characteristics);
    setLoading(false);
  }, [props.characteristics]);

  const saveChanges = async () => {
    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.uid+"/characters"), props.charId), {
			characteristics: tempCharacteristics,
    }, {merge: true})

    props.closeModal();
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

            <div>STR: <input type="number" value={tempCharacteristics.str} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, str: e.target.value}))}/></div>
        
            <div>DEX: <input type="number" value={tempCharacteristics.dex} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, dex: e.target.value}))}/></div>

            <div>CON: <input type="number" value={tempCharacteristics.con} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, con: e.target.value}))}/></div>

            <div>INT: <input type="number" value={tempCharacteristics.int} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, int: e.target.value}))}/></div>

            <div>EGO: <input type="number" value={tempCharacteristics.ego} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, ego: e.target.value}))}/></div>

            <div>OCV: <input type="number" value={tempCharacteristics.ocv} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, ocv: e.target.value}))}/></div>

            <div>DCV: <input type="number" value={tempCharacteristics.dcv} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, dcv: e.target.value}))}/></div>

            <div>OMCV: <input type="number" value={tempCharacteristics.omcv} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, omcv: e.target.value}))}/></div>

            <div>DMCV: <input type="number" value={tempCharacteristics.dmcv} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, dmcv: e.target.value}))}/></div>

            <div>SPD: <input type="number" value={tempCharacteristics.spd} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, spd: e.target.value}))}/></div>

            <div>PD: <input type="number" value={tempCharacteristics.pd} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, pd: e.target.value}))}/></div>

            <div>ED: <input type="number" value={tempCharacteristics.ed} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, ed: e.target.value}))}/></div>

            <div>REC: <input type="number" value={tempCharacteristics.rec} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, rec: e.target.value}))}/></div>

            <div>END: <input type="number" value={tempCharacteristics.end} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, end: e.target.value}))}/></div>

            <div>BODY: <input type="number" value={tempCharacteristics.body} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, body: e.target.value}))}/></div>

            <div>STUN: <input type="number" value={tempCharacteristics.stun} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, stun: e.target.value}))}/></div>

            <div>RUNNING: <input type="number" value={tempCharacteristics.running} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, running: e.target.value}))}/></div>

            <div>SWIMMING: <input type="number" value={tempCharacteristics.swimming} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, swimming: e.target.value}))}/></div>

            <div>LEAPING: <input type="number" value={tempCharacteristics.leaping} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, leaping: e.target.value}))}/></div>

            <div>
              <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
              <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
            </div>
          </div>
        </div>
  );
}
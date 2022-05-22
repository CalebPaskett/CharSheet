import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore} from "firebase/firestore";

export const Characteristics = (props) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const [characteristics, setCharacteristics] = useState(null);
  const [tempCharacteristics, setTempCharacteristics] = useState(null);

  useEffect(() => {
    document.title = (props.character.about.name + " / Characteristics - Hero Sheet");

    setCharacteristics(props.character.characteristics);
    setTempCharacteristics(props.character.characteristics);

		setLoading(false);
  }, [props.character]);

  const saveChanges = async () => {
    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
			characteristics: tempCharacteristics,
    }, {merge: true})

    setCharacteristics(tempCharacteristics);
    setModal(false);
  }

  const closeModal = () => {
    setModal(false);
    setTempCharacteristics(characteristics);
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {modal && <div className="modal-container">
          <div className="overlay" onClick={closeModal}/>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header>
              <h3 className='modal-header'>Editing Characteristics</h3>
            </header>

            <div>STR: <input type="text" value={tempCharacteristics.str} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, str: e.target.value}))}/></div>
        
            <div>DEX: <input type="text" value={tempCharacteristics.dex} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, dex: e.target.value}))}/></div>

            <div>CON: <input type="text" value={tempCharacteristics.con} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, con: e.target.value}))}/></div>

            <div>INT: <input type="text" value={tempCharacteristics.int} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, int: e.target.value}))}/></div>

            <div>EGO: <input type="text" value={tempCharacteristics.ego} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, ego: e.target.value}))}/></div>

            <div>OCV: <input type="text" value={tempCharacteristics.ocv} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, ocv: e.target.value}))}/></div>

            <div>DCV: <input type="text" value={tempCharacteristics.dcv} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, dcv: e.target.value}))}/></div>

            <div>OMCV: <input type="text" value={tempCharacteristics.omcv} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, omcv: e.target.value}))}/></div>

            <div>DMCV: <input type="text" value={tempCharacteristics.dmcv} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, dmcv: e.target.value}))}/></div>

            <div>SPD: <input type="text" value={tempCharacteristics.spd} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, spd: e.target.value}))}/></div>

            <div>PD: <input type="text" value={tempCharacteristics.pd} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, pd: e.target.value}))}/></div>

            <div>ED: <input type="text" value={tempCharacteristics.ed} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, ed: e.target.value}))}/></div>

            <div>REC: <input type="text" value={tempCharacteristics.rec} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, rec: e.target.value}))}/></div>

            <div>END: <input type="text" value={tempCharacteristics.end} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, end: e.target.value}))}/></div>

            <div>BODY: <input type="text" value={tempCharacteristics.body} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, body: e.target.value}))}/></div>

            <div>STUN: <input type="text" value={tempCharacteristics.stun} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, stun: e.target.value}))}/></div>

            <div>RUNNING: <input type="text" value={tempCharacteristics.running} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, running: e.target.value}))}/></div>

            <div>SWIMMING: <input type="text" value={tempCharacteristics.swimming} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, swimming: e.target.value}))}/></div>

            <div>LEAPING: <input type="text" value={tempCharacteristics.leaping} onChange={(e) => setTempCharacteristics(oldCharacteristics => ({...oldCharacteristics, leaping: e.target.value}))}/></div>

            <div>
              <button type="cancel" className="button" onClick={closeModal}>Cancel</button>
              <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
            </div>
          </div>
        </div>}



        <div>STR: {characteristics.str}</div>
        
        <div>DEX: {characteristics.dex}</div>

        <div>CON: {characteristics.con}</div>

        <div>INT: {characteristics.int}</div>

        <div>EGO: {characteristics.ego}</div>

        <div>OCV: {characteristics.ocv}</div>

        <div>DCV: {characteristics.dcv}</div>

        <div>OMCV: {characteristics.omcv}</div>

        <div>DMCV: {characteristics.dmcv}</div>

        <div>SPD: {characteristics.spd}</div>

        <div>PD: {characteristics.pd}</div>

        <div>ED: {characteristics.ed}</div>

        <div>REC: {characteristics.rec}</div>

        <div>END: {characteristics.end}</div>

        <div>BODY: {characteristics.body}</div>

        <div>STUN: {characteristics.stun}</div>

        <div>RUNNING: {characteristics.running}</div>

        <div>SWIMMING: {characteristics.swimming}</div>

        <div>LEAPING: {characteristics.leaping}</div>

        {!modal && <button type="button" className="save button" onClick={() => (setModal(true))}>Edit</button>}
      </div>
  );
}
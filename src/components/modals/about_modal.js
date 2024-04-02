import { useEffect, useState } from 'react';
import { doc, setDoc, getFirestore } from "firebase/firestore";

export const AboutModal = (props) => {
  const [tempAbout, setTempAbout] = useState(null);
  const [tempBack, setTempBack] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTempAbout(props.about);
    setTempBack(props.back);
    setLoading(false);
  }, [props.about, props.back]);

  const saveChanges = async () => {
    setLoading(true);
    
    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.uid+"/characters"), props.charId), {
			basic_info: tempAbout,
      background: tempBack
    }, {merge: true})

    document.title = (tempAbout.info.name + " / About - Hero Sheet");
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
              <h3 className='modal-header'>Editing About</h3>
            </header>

            <div>Name:</div>
            <input type="text" value={tempAbout.info.name} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, info: ({...oldAbout.info, name: e.target.value})}))}/>

            <div>Other Names:</div>
            <input type="text" value={tempAbout.info.alternates} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, info: ({...oldAbout.info, alternates: e.target.value})}))}/>

            <div>Background:</div>
            <textarea rows="4" value={tempBack.history} onChange={(e) => setTempBack(oldBack => ({...oldBack, history: e.target.value}))}/>

            <div>Personality:</div>
            <textarea rows="4" value={tempBack.personality} onChange={(e) => setTempBack(oldBack => ({...oldBack, personality: e.target.value}))}/>

            <div>Quote:</div>
            <textarea rows="4" value={tempBack.quote} onChange={(e) => setTempBack(oldBack => ({...oldBack, quote: e.target.value}))}/>

            <div>Tactics:</div>
            <textarea rows="4" value={tempBack.tactics} onChange={(e) => setTempBack(oldBack => ({...oldBack, tactics: e.target.value}))}/>

            <div>Useage:</div>
            <textarea rows="4" value={tempBack.useage} onChange={(e) => setTempBack(oldBack => ({...oldBack, useage: e.target.value}))}/>

            <div>Appearance:</div>
            <textarea rows="4" value={tempBack.appearance} onChange={(e) => setTempBack(oldBack => ({...oldBack, appearance: e.target.value}))}/>

            <div>
              <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
              <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
            </div>
          </div>
        </div>
  );
}
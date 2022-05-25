import { useEffect, useState } from 'react';
import { doc, setDoc, getFirestore } from "firebase/firestore";

export const AboutModal = (props) => {
  const [tempAbout, setTempAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTempAbout(props.about);
    setLoading(false);
  }, [props.about]);

  const saveChanges = async () => {
    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.uid+"/characters"), props.charId), {
			about: tempAbout,
    }, {merge: true})

    document.title = (tempAbout.name + " / About - Hero Sheet");
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
            <input type="text" value={tempAbout.name} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, name: e.target.value}))}/>

            <div>Other Names:</div>
            <input type="text" value={tempAbout.nicknames} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, nicknames: e.target.value}))}/>

            <div>Background:</div>
            <textarea rows="4" value={tempAbout.background} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, background: e.target.value}))}/>

            <div>Personality:</div>
            <textarea rows="4" value={tempAbout.personality} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, personality: e.target.value}))}/>

            <div>Quote:</div>
            <textarea rows="4" value={tempAbout.quote} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, quote: e.target.value}))}/>

            <div>Tactics:</div>
            <textarea rows="4" value={tempAbout.tactics} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, tactics: e.target.value}))}/>

            <div>Useage:</div>
            <textarea rows="4" value={tempAbout.useage} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, useage: e.target.value}))}/>

            <div>Appearance:</div>
            <textarea rows="4" value={tempAbout.appearance} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, appearance: e.target.value}))}/>

            <div>
              <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
              <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
            </div>
          </div>
        </div>
  );
}
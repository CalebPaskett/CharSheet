import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore} from "firebase/firestore";

export const About = (props) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const [about, setAbout] = useState(null);
  const [tempAbout, setTempAbout] = useState(null);

  useEffect(() => {
    document.title = (props.character.about.name + " / About - Hero Sheet");

    setAbout(props.character.about);
    setTempAbout(props.character.about);

		setLoading(false);
  }, [props.character]);

  const saveChanges = async () => {
    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
			about: tempAbout,
    }, {merge: true})

    setAbout(tempAbout);

    document.title = (tempAbout.name + " / About - Hero Sheet");
    setModal(false);
  }

  const closeModal = () => {
    setModal(false);
    setTempAbout(about);
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
              <button type="cancel" className="button" onClick={closeModal}>Cancel</button>
              <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
            </div>
          </div>
        </div>}

        <div><span className="about-title">Name:</span><span> {about.name}</span></div>
        <div><span className="about-title">Other Names:</span><span> {about.nicknames}</span></div>
        <hr className="solid"/>
        <div className="about-title">Background:</div><div className="about-content">{about.background}</div>
        <hr className="solid"/>
        <div className="about-title">Personality:</div><div className="about-content">{about.personality}</div>
        <hr className="solid"/>
        <div className="about-title">Quote:</div><div className="about-content" style={{fontStyle: "italic"}}>{about.quote}</div>
        <hr className="solid"/>
        <div className="about-title">Tactics:</div><div className="about-content">{about.tactics}</div>
        <hr className="solid"/>
        <div className="about-title">Useage:</div><div className="about-content">{about.useage}</div>
        <hr className="solid"/>
        <div className="about-title">Appearance:</div><div className="about-content">{about.appearance}</div>

        {!modal && <button type="button" className="save button" onClick={() => (setModal(true))}>Edit</button>}
      </div>
  );
}
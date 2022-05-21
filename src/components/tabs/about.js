import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore} from "firebase/firestore";

export const About = (props) => {
  const [loading, setLoading] = useState(true);
  const [saveStat, setSaveStat] = useState("Save Changes")
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
    setSaveStat("Saving...");

    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
			about: tempAbout,
    }, {merge: true})

    setAbout(tempAbout);

    document.title = (tempAbout.name + " / About - Hero Sheet");
    setModal(false);
    setSaveStat("Saved!");
    setTimeout(function() {setSaveStat("Save Changes");}, 500);
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {modal && <div className="modal-container">
          <div className="overlay" onClick={() => (setModal(false))}/>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Edit About</h3>

            <div>Name:</div>
            <input type="text" value={tempAbout.name} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, name: e.target.value}))}/>

            <div>Other Names:</div>
            <input type="text" value={tempAbout.nicknames} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, nicknames: e.target.value}))}/>

            <div>Background:</div>
            <textarea value={tempAbout.background} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, background: e.target.value}))}/>

            <div>Personality:</div>
            <textarea value={tempAbout.personality} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, personality: e.target.value}))}/>

            <div>Quote:</div>
            <textarea value={tempAbout.quote} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, quote: e.target.value}))}/>

            <div>Tactics:</div>
            <textarea value={tempAbout.tactics} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, tactics: e.target.value}))}/>

            <div>Useage:</div>
            <textarea value={tempAbout.useage} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, useage: e.target.value}))}/>

            <div>Appearance:</div>
            <textarea value={tempAbout.appearance} onChange={(e) => setTempAbout(oldAbout => ({...oldAbout, appearance: e.target.value}))}/>

            <button type="button" className="button" onClick={saveChanges}>Save</button>
          </div>
        </div>}

        <div>Name: {about.name}</div>
        <div>Other Names: {about.nicknames}</div>
        <div>Background: {about.background}</div>
        <div>Personality: {about.personality}</div>
        <div>Quote: {about.quote}</div>
        <div>Tactics: {about.tactics}</div>
        <div>Useage: {about.useage}</div>
        <div>Appearance: {about.appearance}</div>

        {!modal && <button type="button" className="save button" onClick={() => (setModal(true))}>Make Changes</button>}
      </div>
  );
}
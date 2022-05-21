import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore} from "firebase/firestore";
import { AboutModal } from '../modals/about_modal';

export const About = (props) => {
  const [loading, setLoading] = useState(true);
  const [saveStat, setSaveStat] = useState("Save Changes")
  const [modal, setModal] = useState(false);

  const [about, setAbout] = useState(null);

  useEffect(() => {
    document.title = (props.character.about.name + " / About - Hero Sheet");

    setAbout(props.character.about);

		setLoading(false);
  }, [props.character]);

  const saveChanges = async () => {
    setSaveStat("Saving...");

    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
			about: about,
    }, {merge: true})

    document.title = (about.name + " / About - Hero Sheet");
    setSaveStat("Saved!");
    setTimeout(function() {setSaveStat("Save Changes");}, 500);
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {modal && <AboutModal about={about}/>}

        <div>Name:</div>
        <input type="text" value={about.name} onChange={(e) => setAbout(oldAbout => ({...oldAbout, name: e.target.value}))}/>

        <div>Other Names:</div>
        <input type="text" value={about.nicknames} onChange={(e) => setAbout(oldAbout => ({...oldAbout, nicknames: e.target.value}))}/>

        <div>Background:</div>
        <textarea value={about.background} onChange={(e) => setAbout(oldAbout => ({...oldAbout, background: e.target.value}))}/>

        <div>Personality:</div>
        <textarea value={about.personality} onChange={(e) => setAbout(oldAbout => ({...oldAbout, personality: e.target.value}))}/>

        <div>Quote:</div>
        <textarea value={about.quote} onChange={(e) => setAbout(oldAbout => ({...oldAbout, quote: e.target.value}))}/>

        <div>Tactics:</div>
        <textarea value={about.tactics} onChange={(e) => setAbout(oldAbout => ({...oldAbout, tactics: e.target.value}))}/>

        <div>Useage:</div>
        <textarea value={about.useage} onChange={(e) => setAbout(oldAbout => ({...oldAbout, useage: e.target.value}))}/>

        <div>Appearance:</div>
        <textarea value={about.appearance} onChange={(e) => setAbout(oldAbout => ({...oldAbout, appearance: e.target.value}))}/>

        <button type="button" className="button" onClick={() => (setModal(true))}>Modal</button>

        <button type="button" className="save button" onClick={saveChanges}>{saveStat}</button>
      </div>
  );
}
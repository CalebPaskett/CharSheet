import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore} from "firebase/firestore";

export const About = (props) => {
  const [loading, setLoading] = useState(true);
  const [saveStat, setSaveStat] = useState("Save Changes")

  const [name, setName] = useState("");
  const [nicknames, setNicknames] = useState("");
  const [background, setBackground] = useState("");
  const [personality, setPersonality] = useState("");
  const [quote, setQuote] = useState("");
  const [tactics, setTactics] = useState("");
  const [useage, setUseage] = useState("");
  const [appearance, setAppearance] = useState("");

  useEffect(() => {
    document.title = (props.character.about.name + " / About - Hero Sheet");

    setName(props.character.about.name);
    setNicknames(props.character.about.nicknames);
    setBackground(props.character.about.background);
    setPersonality(props.character.about.personality);
    setQuote(props.character.about.quote);
    setTactics(props.character.about.tactics);
    setUseage(props.character.about.useage);
    setAppearance(props.character.about.appearance);

		setLoading(false);
  }, [props.character]);

  const saveChanges = async () => {
    setSaveStat("Saving...");

    var about = {
			name: name,
      nicknames: nicknames,
      background: background,
      personality: personality,
      quote: quote,
      tactics: tactics,
      useage: useage,
      appearance: appearance,
    }

    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
			about: about,
    }, {merge: true})

    document.title = (name + " / About - Hero Sheet");
    setSaveStat("Saved!");
    setTimeout(function() {setSaveStat("Save Changes");}, 500);
  }

  if (loading) {
    return <div>Loading, please wait</div>;
  }

  return (
      <div>
        <div>Name:</div>
        <input type="text" value={name} onChange={(e) =>setName(e.target.value)}/>

        <div>Other Names:</div>
        <input type="text" value={nicknames} onChange={(e) =>setNicknames(e.target.value)}/>

        <div>Background:</div>
        <textarea value={background} onChange={(e) => setBackground(e.target.value)}/>

        <div>Personality:</div>
        <textarea value={personality} onChange={(e) => setPersonality(e.target.value)}/>

        <div>Quote:</div>
        <textarea value={quote} onChange={(e) => setQuote(e.target.value)}/>

        <div>Tactics:</div>
        <textarea value={tactics} onChange={(e) => setTactics(e.target.value)}/>

        <div>Useage:</div>
        <textarea value={useage} onChange={(e) => setUseage(e.target.value)}/>

        <div>Appearance:</div>
        <textarea value={appearance} onChange={(e) => setAppearance(e.target.value)}/>

        <button type="button" className="save button" onClick={saveChanges}>{saveStat}</button>
      </div>
  );
}
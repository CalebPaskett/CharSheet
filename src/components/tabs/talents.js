import { useEffect, useState } from 'react';
import {doc, getFirestore, updateDoc, arrayUnion} from "firebase/firestore";
import { TalentCard } from '../cards/talent_card';

export const Talents = (props) => {
  const [loading, setLoading] = useState(true);

  const [talents, setTalents] = useState([]);

  useEffect(() => {
    document.title = (props.character.about.name + " / Talents - Hero Sheet");

    setTalents(props.character.talents);

		setLoading(false);
  }, [props.character]);


  const createTalent = async () => {
    const db = getFirestore();

    var data = {
      name: "",
      description: "",
    };

    await updateDoc(doc(db,  ("users/"+props.user.uid+"/characters"), props.character.id), {
      talents: arrayUnion(data),
    });
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {talents && talents.map((talent, index) => (
            <div key={index}>
              <TalentCard index={index} talent={talent} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createTalent}>Add Talent</button>
      </div>
  );
}
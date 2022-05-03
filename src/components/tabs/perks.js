import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore, updateDoc, arrayUnion} from "firebase/firestore";
import { PerkCard } from '../cards/perk_card';

export const Perks = (props) => {
  const [loading, setLoading] = useState(true);

  const [perks, setPerks] = useState([]);

  useEffect(() => {
    document.title = (props.character.about.name + " / Perks - Hero Sheet");

    setPerks(props.character.perks);

		setLoading(false);
  }, [props.character]);


  const createPerk = async () => {
    const db = getFirestore();

    var data = {
      name: "",
      description: "",
    };

    await updateDoc(doc(db,  ("users/"+props.user.uid+"/characters"), props.character.id), {
      perks: arrayUnion(data),
    });

    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
			changeMarker: false,
    }, {merge: true})

  }

  if (loading) {
    return <div>Loading, please wait</div>;
  }

  return (
      <div>
        {perks && perks.map((perk, index) => (
            <div key={index}>
              <PerkCard perks={perks} index={index} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createPerk}>Add Perk</button>
      </div>
  );
}
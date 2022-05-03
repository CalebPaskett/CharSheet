import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore, updateDoc, arrayUnion} from "firebase/firestore";
import { PowerCard } from '../cards/power_card';

export const Powers = (props) => {
  const [loading, setLoading] = useState(true);

  const [powers, setPowers] = useState([]);

  useEffect(() => {
    document.title = (props.character.about.name + " / Powers - Hero Sheet");

    setPowers(props.character.powers);

		setLoading(false);
  }, [props.character]);


  const createPower = async () => {
    const db = getFirestore();

    var data = {
      name: "",
      description: "",
    };

    await updateDoc(doc(db,  ("users/"+props.user.uid+"/characters"), props.character.id), {
      powers: arrayUnion(data),
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
        {powers && powers.map((power, index) => (
            <div key={index}>
              <PowerCard powers={powers} index={index} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createPower}>Add Power</button>
      </div>
  );
}
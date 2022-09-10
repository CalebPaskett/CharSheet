import { useEffect, useState } from 'react';
import {doc, getFirestore, updateDoc, arrayUnion} from "firebase/firestore";
import { PowerCard } from '../cards/power_card';

export const Powers = (props) => {
  const [loading, setLoading] = useState(true);

  const [powers, setPowers] = useState([]);

  useEffect(() => {
    document.title = (props.character.basic_info.info.name + " / Powers - Hero Sheet");

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
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {powers && powers.map((power, index) => (
            <div key={index}>
              <PowerCard index={index} power={power} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createPower}>Add Power</button>
      </div>
  );
}
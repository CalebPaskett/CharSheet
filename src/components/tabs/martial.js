import { useEffect, useState } from 'react';
import {doc, getFirestore, updateDoc, arrayUnion} from "firebase/firestore";
import { MartialCard } from '../cards/martial_card';

export const Martial = (props) => {
  const [loading, setLoading] = useState(true);

  const [martials, setMartials] = useState([]);

  useEffect(() => {
    document.title = (props.character.about.name + " / Martial - Hero Sheet");

    setMartials(props.character.martials);

		setLoading(false);
  }, [props.character]);


  const createMartial = async () => {
    const db = getFirestore();

    var data = {
      name: "",
      description: "",
    };

    await updateDoc(doc(db,  ("users/"+props.user.uid+"/characters"), props.character.id), {
      martials: arrayUnion(data),
    });
  }

  if (loading) {
    return <div>Loading, please wait</div>;
  }

  return (
      <div>
        {martials && martials.map((martial, index) => (
            <div key={index}>
              <MartialCard index={index} martial={martial} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createMartial}>Add Martial</button>
      </div>
  );
}
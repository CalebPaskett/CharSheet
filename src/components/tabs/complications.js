import { useEffect, useState } from 'react';
import {doc, getFirestore, updateDoc, arrayUnion} from "firebase/firestore";
import { ComplicationCard } from '../cards/complication_card';

export const Complications = (props) => {
  const [loading, setLoading] = useState(true);

  const [complications, setComplications] = useState([]);

  useEffect(() => {
    document.title = (props.character.about.name + " / Complications - Hero Sheet");

    setComplications(props.character.complications);

		setLoading(false);
  }, [props.character]);


  const createComplication = async () => {
    const db = getFirestore();

    var data = {
      name: "",
      description: "",
    };

    await updateDoc(doc(db,  ("users/"+props.user.uid+"/characters"), props.character.id), {
      complications: arrayUnion(data),
    });
  }

  if (loading) {
    return <div>Loading, please wait</div>;
  }

  return (
      <div>
        {complications && complications.map((complication, index) => (
            <div key={index}>
              <ComplicationCard index={index} complication={complication} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createComplication}>Add Complication</button>
      </div>
  );
}
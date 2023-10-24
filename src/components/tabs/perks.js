import { useEffect, useState } from 'react';
import { doc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
import { PerkCard } from '../cards/perk_card';

export const Perks = (props) => {
  const [loading, setLoading] = useState(true);

  const [perks, setPerks] = useState([]);

  useEffect(() => {
    document.title = (props.character.basic_info.info.name + " / Perks - Hero Sheet");

    setPerks(props.character.perks);

		setLoading(false);
  }, [props.character]);


  const createPerk = async () => {
    const db = getFirestore();

    var data = {
			"name": "",
      "roll": "",
      "levels": 0,
			"cost": {
				"total": 0,
				"base": 0,
				"active": 0
			},
			"details": {
				"alias": "",
				"display": "",
				"text": "",
				"option": "",
				"input": "",
				"sfx": "Default"
			},
			"modifiers": [
			],
			"adders": [
			],
			"enhancer": false,
			"list": false,
      "separator": false,
			"notes": ""
		};

    await updateDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
      perks: arrayUnion(data),
    });
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {perks && perks.map((perk, index) => (
            <div key={index}>
              <PerkCard index={index} perk={perk} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createPerk}>Add Perk</button>
      </div>
  );
}

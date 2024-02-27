import { useEffect, useState, useMemo } from 'react';
import { doc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
import { AttributeCard } from '../cards/attribute_card';

export const Attributes = (props) => {
  const [loading, setLoading] = useState(true);

  const [attributes, setAttributes] = useState([]);

  useMemo(() => {
    setLoading(true);

    document.title = (props.character.basic_info.info.name + " / " + props.attribute_type.charAt(0).toUpperCase() + props.attribute_type.slice(1) + " - Hero Sheet");

    setAttributes(props.character[props.attribute_type]);

		setLoading(false);
  }, [props.character, props.attribute_type]);


  const createAttribute = async () => {
    const db = getFirestore();

    var data = {
			"name": "",
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
			"list": false,
      "separator": false,
			"notes": ""
		};

    // Special cases for different attributes
    if (props.attribute_type == "skills" || props.attribute_type == "perks" || props.attribute_type == "talents") {
      data["roll"] = ""

      if (props.attribute_type == "skills" || props.attribute_type == "perks") {
        data["enhancer"] = false

        if (props.attribute_type == "skills") {
          data["everyman"] = false
        }
      }

      if (props.attribute_type == "powers") {
        data["range"] = ""
        data["damage"] = ""
        data["end"] = ""
        data["levels"] = ""
      }
    }

    await updateDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
      [props.attribute_type]: arrayUnion(data),
    });
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {attributes && attributes.map((attribute, index) => (
            <div key={index}>
              <AttributeCard index={index} attribute={attribute} attribute_type={props.attribute_type} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createAttribute}>Add {props.attribute_type.charAt(0).toUpperCase() + props.attribute_type.slice(1, -1)}</button>
      </div>
  );
}

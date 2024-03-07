import { useEffect, useState } from 'react';
import { doc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
import { AttributeCard } from '../cards/attribute_card';

export const Attributes = (props) => {
  const [loading, setLoading] = useState(true);

  const [attributes, setAttributes] = useState([]);
  const [attributeType, setAttributeType] = useState([]);

  useEffect(() => {
    setLoading(true);

    document.title = (props.character.basic_info.info.name + " / " + props.attribute_type.charAt(0).toUpperCase() + props.attribute_type.slice(1) + " - Hero Sheet");

    setAttributes(props.character[props.attribute_type]);
    setAttributeType(props.attribute_type)

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
      "types": [
      ],
			"notes": ""
		};

    // Special cases for different attributes
    if (attributeType === "skills" || attributeType === "perks" || attributeType === "talents") {
      data["roll"] = ""
    }
    else if (attributeType === "powers") {
      data["range"] = ""
      data["damage"] = ""
      data["end"] = ""
      data["levels"] = ""
    }

    await updateDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
      [attributeType]: arrayUnion(data),
    });
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {attributes && attributes.map((attribute, index) => (
            <div key={index}>
              <AttributeCard index={index} attribute={attribute} attribute_type={attributeType} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createAttribute}>Add {attributeType.charAt(0).toUpperCase() + attributeType.slice(1, -1)}</button>
      </div>
  );
}

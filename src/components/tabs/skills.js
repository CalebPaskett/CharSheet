import { useEffect, useState } from 'react';
import { doc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";
import { SkillCard } from '../cards/skill_card';

export const Skills = (props) => {
  const [loading, setLoading] = useState(true);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    document.title = (props.character.basic_info.info.name + " / Skills - Hero Sheet");

    setSkills(props.character.skills);

		setLoading(false);
  }, [props.character]);


  const createSkill = async () => {
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
      "everyman": false,
			"list": false,
      "separator": false,
			"notes": ""
		};

    await updateDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
      skills: arrayUnion(data),
    });
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {skills && skills.map((skill, index) => (
            <div key={index}>
              <SkillCard index={index} skill={skill} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createSkill}>Add Skill</button>
      </div>
  );
}
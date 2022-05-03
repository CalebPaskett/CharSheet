import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore, updateDoc, arrayUnion} from "firebase/firestore";
import { SkillCard } from '../cards/skill_card';

export const Skills = (props) => {
  const [loading, setLoading] = useState(true);

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    document.title = (props.character.about.name + " / Skills - Hero Sheet");

    setSkills(props.character.skills);

		setLoading(false);
  }, [props.character]);


  const createSkill = async () => {
    const db = getFirestore();

    var data = {
      name: "",
      description: "",
    };

    await updateDoc(doc(db,  ("users/"+props.user.uid+"/characters"), props.character.id), {
      skills: arrayUnion(data),
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
        {skills && skills.map((skill, index) => (
            <div key={index}>
              <SkillCard skills={skills} index={index} userId={props.user.uid} characterId={props.character.id}/>
            </div>
          ))}

        <button type="button" onClick={createSkill}>Add Skill</button>
      </div>
  );
}
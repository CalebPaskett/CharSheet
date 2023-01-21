import { useEffect, useState } from 'react';
import { doc, setDoc, getDoc, getFirestore, updateDoc, arrayRemove } from "firebase/firestore";
import { SkillEditCard } from '../cards/skill_edit_card';

export const SkillModal = (props) => {
  const [tempSkill, setTempSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTempSkill(props.skill);
    setLoading(false);
  }, [props.skill]);

  const saveChanges = async () => {
    setLoading(true);

    const db = getFirestore();

    let character = await getDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId));
    var newSkills = character.data().skills;
    newSkills[props.index] = tempSkill;

    await setDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
			skills: newSkills,
    }, {merge: true})

    props.closeModal();
  }

  const deleteSkill = async () => {
    const db = getFirestore();

    await updateDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
      skills: arrayRemove(props.skill),
    });

    props.closeModal();
  }

  const setSkill = (path, value) => {
    if (path.length === 1) {
      setTempSkill(oldSkill => ({...oldSkill, [path[0]]: value}));
    }
    else if (path.length === 2) {
      setTempSkill(oldSkill => ({...oldSkill, [path[0]]: ({...oldSkill[path[0]], [path[1]]: value})}));
    }
    else if (path.length === 3) {
      setTempSkill(oldSkill => ({...oldSkill, [path[0]]: ({...oldSkill[path[0]], [path[1]]: ({...oldSkill[path[0]][path[1]], [path[2]]: value})})}));
    }
    else if (path.length === 4) {
      setTempSkill(oldSkill => ({...oldSkill, [path[0]]: ({...oldSkill[path[0]], [path[1]]: ({...oldSkill[path[0]][path[1]], [path[2]]: ({...oldSkill[path[0]][path[1]][path[2]], [path[3]]: value})})})}));
    }
  }

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="modal-container">
      <div className="overlay" onClick={() => (props.closeModal())}/>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <h3 className='modal-header'>Editing {props.skill.name}</h3>
        </header>

        <SkillEditCard skill={tempSkill} setSkill={setSkill}/>

        <div>
          <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
          <button type="button" className="button" onClick={deleteSkill}>Delete</button>
          <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
        </div>
      </div>
    </div>
  );
}
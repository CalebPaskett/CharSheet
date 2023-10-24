import { useEffect, useState } from 'react';
import { doc, setDoc, getDoc, getFirestore, updateDoc, arrayRemove } from "firebase/firestore";
import { PerkEditCard } from '../cards/perk_edit_card';

export const PerkModal = (props) => {
  const [tempPerk, setTempPerk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTempPerk(props.perk);
    setLoading(false);
  }, [props.perk]);

  const saveChanges = async () => {
    setLoading(true);

    const db = getFirestore();

    let character = await getDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId));
    var newPerks = character.data().perks;
    newPerks[props.index] = tempPerk;

    await setDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
			perks: newPerks,
    }, {merge: true})

    props.closeModal();
  }

  const deletePerk = async () => {
    const db = getFirestore();

    await updateDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
      perks: arrayRemove(props.perk),
    });

    props.closeModal();
  }

  const setPerk = (path, value) => {
    if (path.length === 1) {
      setTempPerk(oldPerk => ({...oldPerk, [path[0]]: value}));
    }
    else if (path.length === 2) {
      setTempPerk(oldPerk => ({...oldPerk, [path[0]]: ({...oldPerk[path[0]], [path[1]]: value})}));
    }
    else if (path.length === 3) {
      setTempPerk(oldPerk => ({...oldPerk, [path[0]]: ({...oldPerk[path[0]], [path[1]]: ({...oldPerk[path[0]][path[1]], [path[2]]: value})})}));
    }
    else if (path.length === 4) {
      setTempPerk(oldPerk => ({...oldPerk, [path[0]]: ({...oldPerk[path[0]], [path[1]]: ({...oldPerk[path[0]][path[1]], [path[2]]: ({...oldPerk[path[0]][path[1]][path[2]], [path[3]]: value})})})}));
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
          <h3 className='modal-header'>Editing {props.perk.name}</h3>
        </header>

        <PerkEditCard perk={tempPerk} setPerk={setPerk}/>

        <div>
          <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
          <button type="button" className="button" onClick={deletePerk}>Delete</button>
          <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
        </div>
      </div>
    </div>
  );
}
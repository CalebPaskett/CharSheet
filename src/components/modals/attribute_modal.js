import { useEffect, useState } from 'react';
import { doc, setDoc, getDoc, getFirestore, updateDoc, arrayRemove } from "firebase/firestore";
import { AttributeEditCard } from '../cards/attribute_edit_card';

export const AttributeModal = (props) => {
  const [tempAttribute, setTempAttribute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTempAttribute(props.attribute);
    setLoading(false);
  }, [props.attribute]);

  const saveChanges = async () => {
    props.closeModal();
    setLoading(true);

    const db = getFirestore();

    let character = await getDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId));
    var newAttributes = character.data()[props.attribute_type];
    newAttributes[props.index] = tempAttribute;

    await setDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
			[props.attribute_type]: newAttributes,
    }, {merge: true})
  }

  const deleteAttribute = async () => {
    const db = getFirestore();

    await updateDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
      [props.attribute_type]: arrayRemove(props.attribute),
    });

    props.closeModal();
  }

  const setAttribute = (path, value) => {
    if (path.length === 1) {
      setTempAttribute(oldAttribute => ({...oldAttribute, [path[0]]: value}));
    }
    else if (path.length === 2) {
      setTempAttribute(oldAttribute => ({...oldAttribute, [path[0]]: ({...oldAttribute[path[0]], [path[1]]: value})}));
    }
    else if (path.length === 3) {
      setTempAttribute(oldAttribute => ({...oldAttribute, [path[0]]: ({...oldAttribute[path[0]], [path[1]]: ({...oldAttribute[path[0]][path[1]], [path[2]]: value})})}));
    }
    else if (path.length === 4) {
      setTempAttribute(oldAttribute => ({...oldAttribute, [path[0]]: ({...oldAttribute[path[0]], [path[1]]: ({...oldAttribute[path[0]][path[1]], [path[2]]: ({...oldAttribute[path[0]][path[1]][path[2]], [path[3]]: value})})})}));
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
          <h3 className='modal-header'>Editing {props.attribute.name ? props.attribute.name : "New " + props.attribute_type.charAt(0).toUpperCase() + props.attribute_type.slice(1, -1)}</h3>
        </header>

        <AttributeEditCard attribute={tempAttribute} setAttribute={setAttribute}/>

        <div>
          <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
          <button type="button" className="button" onClick={deleteAttribute}>Delete</button>
          <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
        </div>
      </div>
    </div>
  );
}
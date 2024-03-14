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
    setTempAttribute(oldAttribute => (modifyAttribute(path, value, oldAttribute)))
  }

  const modifyAttribute = (path, value, attributePiece) => {
    if (path.length === 1) {
      if (typeof path[0] === "number") {
        var attributePieceCopy = [...attributePiece]
        attributePieceCopy[path[0]] = value
        return attributePieceCopy
      }
      else {
        return {...attributePiece, [path[0]]: value}
      }
    }
    else if (path.length > 1) {
      if (typeof path[0] === "number") {
        var attributePieceCopy2 = [...attributePiece]
        attributePieceCopy2[path[0]] = modifyAttribute(path.slice(1), value, attributePieceCopy2[path[0]])
        return attributePieceCopy2
      }
      else if (path[0] === 'types' && value === 'toggle') {
        return {...attributePiece, 'types': getToggledTypes(path[1], attributePiece['types'])}
      }
      else {
        return {...attributePiece, [path[0]]: modifyAttribute(path.slice(1), value, attributePiece[path[0]])}
      }
    }
  }

  const getToggledTypes = (newType, currentTypes) => {
    var index = currentTypes.indexOf(newType);
    var newTypes = [...currentTypes]

    if (index === -1) {
      newTypes.push(newType)
    }
    else {
      newTypes.splice(index, 1)
    }

    return newTypes
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

        <AttributeEditCard attribute={tempAttribute} attribute_type={props.attribute_type} setAttribute={setAttribute} parentPath={[]}/>

        <div>
          <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
          <button type="button" className="button" onClick={deleteAttribute}>Delete</button>
          <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
        </div>
      </div>
    </div>
  );
}
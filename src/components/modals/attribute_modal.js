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
    var newAttributes = character.data()[props.attributeType];
    newAttributes[props.index] = tempAttribute;

    await setDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
			[props.attributeType]: newAttributes,
    }, {merge: true})
  }

  const deleteAttribute = async () => {
    const db = getFirestore();

    await updateDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
      [props.attributeType]: arrayRemove(props.attribute),
    });

    props.closeModal();
  }

  const setAttribute = (path, value) => {
    setTempAttribute(oldAttribute => (modifyAttribute(path, value, oldAttribute, "replace")))
  }

  const addSubAttribute= (path, type) => {
    var newSubAttribute
    if (type === 'minor') {
      newSubAttribute = {
        "name": "",
        "levels": 0,
        "cost": "",
        "value": "",
        "details": {
          "display": "",
          "text": "",
          "option": "",
          "input": ""
        }
      };
    }
    else {
      newSubAttribute = {
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
        "contents": [
        ],
        "modifiers": [
        ],
        "adders": [
        ],
        "types": [
        ],
        "notes": ""
      };
  
      // Special cases for different attributes
      if (type === "skills" || type === "perks" || type === "talents") {
        newSubAttribute["roll"] = ""
      }
      else if (type === "powers" || type === "equipment") {
        newSubAttribute["range"] = ""
        newSubAttribute["damage"] = ""
        newSubAttribute["end"] = ""
        newSubAttribute["levels"] = ""
      }
      else if (type === "martials") {
        newSubAttribute["phase"] = ""
        newSubAttribute["ocv"] = ""
        newSubAttribute["dcv"] = ""
        newSubAttribute["effect"] = ""
      }
    }

    setTempAttribute(oldAttribute => (modifyAttribute(path, newSubAttribute, oldAttribute, "insert")))
  }

  const delSubAttribute= (path) => {
    setTempAttribute(oldAttribute => (modifyAttribute(path, null, oldAttribute, "delete")))
  }

  const modifyAttribute = (path, value, attributePiece, operation) => {
    var attributePieceCopy
    if (path.length === 1) {
      if (typeof path[0] === "number") {
        if (operation === "replace") {
          attributePieceCopy = [...attributePiece]
          attributePieceCopy[path[0]] = value
          return attributePieceCopy
        }
        else if (operation === "delete") {
          attributePieceCopy = [...attributePiece]
          attributePieceCopy.splice(path[0], 1)
          return attributePieceCopy
        }
      }
      else if (operation === "replace") {
        return {...attributePiece, [path[0]]: value}
      }
      else if (operation === "insert") {
        return {...attributePiece, [path[0]]: [...attributePiece[path[0]], value]}
      }
    }
    else if (path.length > 1) {
      if (typeof path[0] === "number") {
        attributePieceCopy = [...attributePiece]
        attributePieceCopy[path[0]] = modifyAttribute(path.slice(1), value, attributePieceCopy[path[0]], operation)
        return attributePieceCopy
      }
      else if (path[0] === 'types' && value === 'toggle') {
        return {...attributePiece, 'types': getToggledTypes(path[1], attributePiece['types'], operation)}
      }
      else {
        return {...attributePiece, [path[0]]: modifyAttribute(path.slice(1), value, attributePiece[path[0]], operation)}
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
          <h3 className='modal-header'>Editing {props.attribute.name ? props.attribute.name : "New " + props.attributeType.charAt(0).toUpperCase() + props.attributeType.slice(1, -1)}</h3>
        </header>

        <AttributeEditCard attribute={tempAttribute} attributeType={props.attributeType} setAttribute={setAttribute} addSubAttribute={addSubAttribute} delSubAttribute={delSubAttribute} parentPath={[]}/>

        <div>
          <button type="cancel" className="button" onClick={() => (props.closeModal())}>Cancel</button>
          <button type="button" className="button" onClick={deleteAttribute}>Delete</button>
          <button type="button" className="modal-save button" onClick={saveChanges}>Save</button>
        </div>
      </div>
    </div>
  );
}
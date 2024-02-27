import { useState } from 'react';
import { MinorCard } from './minor_card';
import { AttributeModal } from '../modals/attribute_modal';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { doc, getFirestore, getDoc, setDoc} from "firebase/firestore";
import { FaEdit } from 'react-icons/fa';

export const AttributeCard = (props) => {
  const [modal, setModal] = useState(false);

  const changeOrder = async (direction) => {
    const db = getFirestore();

    let character = await getDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId));
    var newAttributes = character.data()[props.attribute_type];

    var swap_index = (direction === "up") ? props.index-1 : props.index+1;

    [newAttributes[props.index], newAttributes[swap_index]] = [newAttributes[swap_index], newAttributes[props.index]];

    await setDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
			[props.attribute_type]: newAttributes,
    }, {merge: true})
  }

  return (
    <div>
      {modal && <AttributeModal index={props.index} attribute={props.attribute} attribute_type={props.attribute_type} closeModal={setModal} userId={props.userId} characterId={props.characterId}/>}

      {!props.attribute.separator &&
        <details>
          <summary>
            {props.attribute.name}      
            <div className='sort-container'>
              <button type="button" className="sort-button" onClick={() => (changeOrder("up"))}><IoIosArrowUp/></button>
              <br/>
              <button type="button" className="sort-button" onClick={() => (changeOrder("down"))}><IoIosArrowDown/></button>
            </div>
          </summary>
          {(typeof props.attribute.levels !== 'undefined') && <div>Levels: {props.attribute.levels}</div>}
          {(typeof props.attribute.roll !== 'undefined' && props.attribute.roll !== "") && <div>Roll: {props.attribute.roll}</div>}
          {(typeof props.attribute.damage !== 'undefined' && props.attribute.damage !== "") && <div>Damage: {props.attribute.damage}</div>}
          {(typeof props.attribute.end !== 'undefined' && props.attribute.end !== "") && <div>END: {props.attribute.end}</div>}
          {(typeof props.attribute.levels !== 'undefined' && props.attribute.levels !== "") && <div>Levels: {props.attribute.levels}</div>}
          {(typeof props.attribute.range !== 'undefined' && props.attribute.range !== "") && <div>Range: {props.attribute.range}</div>}
          <div>Notes: {props.attribute.notes}</div>

          <details>
            <summary>Cost: {props.attribute.cost.total}</summary>
            <div>Total: {props.attribute.cost.total}</div>
            <div>Base: {props.attribute.cost.base}</div>
            <div>Active: {props.attribute.cost.active}</div>
            {props.attribute.list && <div>List: {props.attribute.cost.list}</div>}
            {props.attribute.list && <div> Active: {props.attribute.cost.list_active}</div>}
          </details>

          <details>
            <summary>Details</summary>
            <div>Alias: {props.attribute.details.alias}</div>
            <div>Display: {props.attribute.details.display}</div>
            <div>Text: {props.attribute.details.text}</div>
            <div>Option: {props.attribute.details.option}</div>
            <div>Input: {props.attribute.details.input}</div>
            <div>Sfx: {props.attribute.details.sfx}</div>
          </details>

          {(props.attribute.list || (typeof props.attribute.types !== 'undefined' && typeof props.attribute.types.list !== 'undefined')) && <details>
            <summary>Sub-{props.attribute_type.charAt(0).toUpperCase() + props.attribute_type.slice(1)}</summary>
            {props.attribute.contents.map((attribute, index) => (
              <div key={index}>
                <AttributeCard index={index} attribute={attribute} userId={props.userId} characterId={props.characterId}/>
              </div>
            ))}
          </details>}

          {(typeof props.attribute.components !== 'undefined' ) && <details>
            <summary>Component Powers</summary>
            {props.attribute.components.map((attribute, index) => (
              <div key={index}>
                <AttributeCard index={index} attribute={attribute} userId={props.userId} characterId={props.characterId}/>
              </div>
            ))}
          </details>}

          {(props.attribute.modifiers.length > 0) && <details>
            <summary>Modifiers</summary>
            {props.attribute.modifiers.map((modifier, index) => (
              <div key={index}>
                <MinorCard index={index} values={modifier}/>
              </div>
            ))}
          </details>}

          {(props.attribute.adders.length > 0) && <details>
            <summary>Adders</summary>
            {props.attribute.adders.map((modifier, index) => (
              <div key={index}>
                <MinorCard index={index} values={modifier}/>
              </div>
            ))}
          </details>}

          {(props.attribute_type === "skills" || props.attribute_type === "perks") && props.attribute.enhancer && <div>Enhancer</div>}
          {(props.attribute_type === "skills") && props.attribute.everyman && <div>Everyman</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.adjustment !== 'undefined') && <div>Adjustment Power</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.attack !== 'undefined') && <div>Attack Power</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.body_affecting !== 'undefined') && <div>Body Affecting Power</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.defense !== 'undefined') && <div>Defense Power</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.mental !== 'undefined') && <div>Mental Power</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.movement !== 'undefined') && <div>Movement Power</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.sense_affecting !== 'undefined') && <div>Sense Affecting Power</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.sensory !== 'undefined') && <div>Sensory Power</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.special !== 'undefined') && <div>Special Power</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.multipower !== 'undefined') && <div>Multipower</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.ec !== 'undefined') && <div>EC</div>}
          {(props.attribute_type === "powers") && (typeof props.attribute.types.vpp !== 'undefined') && <div>Variable Power Pool</div>}

          <button type="button" onClick={() => (setModal(true))}><FaEdit/></button>
        </details>
      }
    </div>
  );  
}
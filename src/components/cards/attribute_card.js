import { useState } from 'react';
import { MinorCard } from './minor_card';
import { AttributeModal } from '../modals/attribute_modal';
import { TypesDisplay } from '../displays/types_display';
import { SFXDisplay } from '../displays/sfx_display';
import { doc, getFirestore, getDoc, setDoc} from "firebase/firestore";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaEdit } from 'react-icons/fa';
import { SlEnergy } from "react-icons/sl";
import { IoDiceSharp } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";
import { GiAllForOne } from "react-icons/gi";

export const AttributeCard = (props) => {
  const [modal, setModal] = useState(false);

  const changeOrder = async (direction) => {
    const db = getFirestore();

    let character = await getDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId));
    var newAttributes = character.data()[props.attributeType];

    var swap_index = (direction === "up") ? props.index-1 : props.index+1;

    [newAttributes[props.index], newAttributes[swap_index]] = [newAttributes[swap_index], newAttributes[props.index]];

    await setDoc(doc(db, ("users/"+props.userId+"/characters"), props.characterId), {
			[props.attributeType]: newAttributes,
    }, {merge: true})
  }

  return (
    <div>
      {modal && <AttributeModal index={props.index} attribute={props.attribute} attributeType={props.attributeType} closeModal={setModal} userId={props.userId} characterId={props.characterId}/>}

      {!props.attribute.types.includes("separator") &&
        <details open={false} className={props.is_sub ? "attribute-sub-attribute-summary" : ""}>
          <summary>
            <div className='attribute-main'>
              <span className='attribute-title-box'>
                <span className='attribute-title'>{props.attribute.name}</span>
                {(props.attribute.details.alias !== '' ? props.attribute.details.alias : props.attribute.details.display) !== props.attribute.name && <span className='attribute-sub-title'>{props.attribute.details.alias !== '' ? props.attribute.details.alias : props.attribute.details.display}</span>}
              </span>

              {(props.attributeType === 'powers' || props.attributeType === 'equipment' || props.attribute.damage) && <span className='attribute-damage-box'>
                {props.attribute.damage && <span className='attribute-damage-or-range-sub-box'><GiAllForOne/>{props.attribute.damage}</span>}
              </span>}

              {(props.attributeType === 'powers' || props.attributeType === 'equipment' || props.attribute.range) && <span className='attribute-damage-box'>
                {props.attribute.range && <span className='attribute-damage-or-range-sub-box'><TbTargetArrow/>{props.attribute.range}</span>}
              </span>}

              <span className='attribute-types-box'><TypesDisplay types={props.attribute.types}/></span>
              <span className='attribute-sfx-box'><SFXDisplay sfx={props.attribute.details.sfx}/></span>              

              {(props.attributeType === 'skills' || props.attribute.roll) && <span className='attribute-end-box'>
                <div className='attribute-divider'></div>
                {props.attribute.roll && <span className='attribute-end-sub-box'><IoDiceSharp/><span className='attribute-end'>{props.attribute.roll}</span></span>}
              </span>}
              {(props.attributeType === 'powers' || props.attributeType === 'equipment' || props.attribute.end) && <span className='attribute-end-box'>
                <div className='attribute-divider'></div>
                {props.attribute.end && <span className='attribute-end-sub-box'><SlEnergy/><span className='attribute-end'>{props.attribute.end}</span></span>}
              </span>}
            </div>

            {props.attribute.types.includes("list") && <details open={true} className='attribute-sub-attributes-details'>
              <summary className="attribute-sub-attributes-summary">Sub-{props.attributeType.charAt(0).toUpperCase() + props.attributeType.slice(1)}</summary>
              {props.attribute.contents.map((attribute, index) => (
                <div key={index}>
                  <AttributeCard index={index} attribute={attribute} attributeType={props.attributeType} userId={props.userId} characterId={props.characterId} is_sub={true}/>
                </div>
              ))}
            </details>}

            {props.attribute.types.includes("compound") && <details open={true} className='attribute-sub-attributes-details'>
              <summary className="attribute-sub-attributes-summary">Component Powers</summary>
              {props.attribute.components.map((attribute, index) => (
                <div key={index}>
                  <AttributeCard index={index} attribute={attribute} attributeType={props.attributeType} userId={props.userId} characterId={props.characterId} is_sub={true}/>
                </div>
              ))}
            </details>}

          </summary>
          {(typeof props.attribute.levels !== 'undefined') && <div>Levels: {props.attribute.levels}</div>}

          {(typeof props.attribute.phase !== 'undefined' && props.attribute.phase !== "") && <div>Phases: {props.attribute.phase}</div>}
          {(typeof props.attribute.ocv !== 'undefined' && props.attribute.ocv !== "") && <div>OCV: {props.attribute.ocv}</div>}
          {(typeof props.attribute.dcv !== 'undefined' && props.attribute.dcv !== "") && <div>DCV: {props.attribute.dcv}</div>}
          {(typeof props.attribute.effect !== 'undefined' && props.attribute.effect !== "") && <div>Effect: {props.attribute.effect}</div>}
          <div>Notes: {props.attribute.notes}</div>

          <details>
            <summary>Cost: {props.attribute.cost.total}</summary>
            <div>Total: {props.attribute.cost.total}</div>
            <div>Base: {props.attribute.cost.base}</div>
            <div>Active: {props.attribute.cost.active}</div>
            {props.attribute.types.includes("list") && <div>List: {props.attribute.cost.list}</div>}
            {props.attribute.types.includes("list") && <div>Active: {props.attribute.cost.list_active}</div>}
          </details>

          <details>
            <summary>Details</summary>
            <div>Alias: {props.attribute.details.alias}</div>
            <div>Display: {props.attribute.details.display}</div>
            <div>Text: {props.attribute.details.text}</div>
            <div>Option: {props.attribute.details.option}</div>
            <div>Input: {props.attribute.details.input}</div>
          </details>

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

          {props.attribute.types.includes("compound") &&        <div>Compound Power</div>}

          {!props.is_sub && <button type="button" onClick={() => (setModal(true))}><FaEdit/></button>}

          
          <span className='sort-container'>
              <button type="button" className="sort-button" onClick={() => (changeOrder("up"))}><IoIosArrowUp/></button>
              <br/>
              <button type="button" className="sort-button" onClick={() => (changeOrder("down"))}><IoIosArrowDown/></button>
            </span>
        </details>
      }

      {props.attribute.types.includes("separator") && 
        <div>
          <div className='sort-container'>
            <button type="button" className="sort-button" onClick={() => (changeOrder("up"))}><IoIosArrowUp/></button>
            <br/>
            <button type="button" className="sort-button" onClick={() => (changeOrder("down"))}><IoIosArrowDown/></button>
          </div>
        </div>
      }
    </div>
  );  
}
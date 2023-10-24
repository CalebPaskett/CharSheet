import { useState } from 'react';
import { MinorCard } from './minor_card';
import { PerkModal } from '../modals/perk_modal';
import { FaEdit } from "react-icons/fa";

export const PerkCard = (props) => {
  const [modal, setModal] = useState(false);

  //{(typeof props.perk.roll !== 'undefined' && props.perk.roll != "") && (": "+ props.perk.roll)}

  return (
    <div>
      {modal && <PerkModal index={props.index} perk={props.perk} closeModal={setModal} userId={props.userId} characterId={props.characterId}/>}

      {!props.perk.separator &&
        <details>
          <summary>{props.perk.name}</summary>
          {(typeof props.perk.levels !== 'undefined') && <div>Levels: {props.perk.levels}</div>}
          {(typeof props.perk.roll !== 'undefined' && props.perk.roll !== "") && <div>Roll: {props.perk.roll}</div>}
          <div>Notes: {props.perk.notes}</div>

          <details>
            <summary>Cost: {props.perk.cost.total}</summary>
            <div>Total: {props.perk.cost.total}</div>
            <div>Base: {props.perk.cost.base}</div>
            <div>Active: {props.perk.cost.active}</div>
            {props.perk.list && <div>List: {props.perk.cost.list}</div>}
            {props.perk.list && <div> Active: {props.perk.cost.list_active}</div>}
          </details>

          <details>
            <summary>Details</summary>
            <div>Alias: {props.perk.details.alias}</div>
            <div>Display: {props.perk.details.display}</div>
            <div>Text: {props.perk.details.text}</div>
            <div>Option: {props.perk.details.option}</div>
            <div>Input: {props.perk.details.input}</div>
            <div>Sfx: {props.perk.details.sfx}</div>
          </details>

          {props.perk.list && <details>
            <summary>Sub-perks</summary>
            {props.perk.contents.map((perk, index) => (
                <div key={index}>
                  <PerkCard index={index} perk={perk} userId={props.userId} characterId={props.characterId}/>
                </div>
              ))}
          </details>}

          {(props.perk.modifiers.length > 0) && <details>
            <summary>Modifiers</summary>
            {props.perk.modifiers.map((modifier, index) => (
                <div key={index}>
                  <MinorCard index={index} values={modifier}/>
                </div>
              ))}
          </details>}

          {(props.perk.adders.length > 0) && <details>
            <summary>Adders</summary>
            {props.perk.adders.map((modifier, index) => (
                <div key={index}>
                  <MinorCard index={index} values={modifier}/>
                </div>
              ))}
          </details>}

          {props.perk.enhancer && <div>Enhancer</div>}

          <button type="button" onClick={() => (setModal(true))}><FaEdit/></button>
        </details>
      }
    </div>
  );
}
import { useState } from 'react';
import { MinorCard } from './minor_card';
import { SkillModal } from '../modals/skill_modal';
import { FaEdit } from "react-icons/fa";

export const SkillCard = (props) => {
  const [modal, setModal] = useState(false);

  //{(typeof props.skill.roll !== 'undefined' && props.skill.roll != "") && (": "+ props.skill.roll)}

  return (
    <div>
      {modal && <SkillModal index={props.index} skill={props.skill} closeModal={setModal} userId={props.userId} characterId={props.characterId}/>}

      {!props.skill.separator &&
        <details>
          <summary>{props.skill.name}</summary>
          {(typeof props.skill.levels !== 'undefined') && <div>Levels: {props.skill.levels}</div>}
          {(typeof props.skill.roll !== 'undefined' && props.skill.roll !== "") && <div>Roll: {props.skill.roll}</div>}
          <div>Notes: {props.skill.notes}</div>

          <details>
            <summary>Cost: {props.skill.cost.total}</summary>
            <div>Total: {props.skill.cost.total}</div>
            <div>Base: {props.skill.cost.base}</div>
            <div>Active: {props.skill.cost.active}</div>
            {props.skill.list && <div>List: {props.skill.cost.list}</div>}
            {props.skill.list && <div> Active: {props.skill.cost.list_active}</div>}
          </details>

          <details>
            <summary>Details</summary>
            <div>Alias: {props.skill.details.alias}</div>
            <div>Display: {props.skill.details.display}</div>
            <div>Text: {props.skill.details.text}</div>
            <div>Option: {props.skill.details.option}</div>
            <div>Input: {props.skill.details.input}</div>
            <div>Sfx: {props.skill.details.sfx}</div>
          </details>

          {props.skill.list && <details>
            <summary>Sub-skills</summary>
            {props.skill.contents.map((skill, index) => (
                <div key={index}>
                  <SkillCard index={index} skill={skill} userId={props.userId} characterId={props.characterId}/>
                </div>
              ))}
          </details>}

          {(props.skill.modifiers.length > 0) && <details>
            <summary>Modifiers</summary>
            {props.skill.modifiers.map((modifier, index) => (
                <div key={index}>
                  <MinorCard index={index} values={modifier}/>
                </div>
              ))}
          </details>}

          {(props.skill.adders.length > 0) && <details>
            <summary>Adders</summary>
            {props.skill.adders.map((modifier, index) => (
                <div key={index}>
                  <MinorCard index={index} values={modifier}/>
                </div>
              ))}
          </details>}

          {props.skill.enhancer && <div>Enhancer</div>}
          {props.skill.everyman && <div>Everyman</div>}

          <button type="button" onClick={() => (setModal(true))}><FaEdit/></button>
        </details>
      }
    </div>
  );
}
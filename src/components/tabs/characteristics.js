import { useEffect, useState } from 'react';
import { CharacteristicsModal } from '../modals/characteristics_modal';
import { CharacteristicCard } from '../cards/characteristic_card';

import { FaEdit } from "react-icons/fa";

export const Characteristics = (props) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const [characteristics, setCharacteristics] = useState(null);

  useEffect(() => {
    document.title = (props.character.basic_info.info.name + " / Characteristics - Hero Sheet");

    setCharacteristics(props.character.characteristics);

		setLoading(false);
  }, [props.character]);

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {modal && <CharacteristicsModal characteristics={characteristics} closeModal={setModal} uid={props.user.uid} charId={props.character.id}/>}

        <CharacteristicCard char="STR" values={characteristics.str}/>
        <CharacteristicCard char="DEX" values={characteristics.dex}/>
        <CharacteristicCard char="CON" values={characteristics.con}/>
        <CharacteristicCard char="INT" values={characteristics.int}/>
        <CharacteristicCard char="EGO" values={characteristics.ego}/>
        <CharacteristicCard char="OCV" values={characteristics.ocv}/>
        <CharacteristicCard char="DCV" values={characteristics.dcv}/>
        <CharacteristicCard char="OMCV" values={characteristics.omcv}/>
        <CharacteristicCard char="DMCV" values={characteristics.dmcv}/>
        <CharacteristicCard char="SPD" values={characteristics.spd}/>
        <CharacteristicCard char="PD" values={characteristics.pd}/>
        <CharacteristicCard char="ED" values={characteristics.ed}/>
        <CharacteristicCard char="REC" values={characteristics.rec}/>
        <CharacteristicCard char="END" values={characteristics.end}/>
        <CharacteristicCard char="BODY" values={characteristics.body}/>
        <CharacteristicCard char="STUN" values={characteristics.stun}/>

        <CharacteristicCard char="Running" values={characteristics.movement.running}/>
        <CharacteristicCard char="Swimming" values={characteristics.movement.swimming}/>
        <CharacteristicCard char="Leaping" values={characteristics.movement.leaping}/>

        {!modal && <button type="button" className="edit button" onClick={() => (setModal(true))}><FaEdit/></button>}
      </div>
  );
}
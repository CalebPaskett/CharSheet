import { useEffect, useState } from 'react';
import { CharacteristicsModal } from '../modals/characteristics_modal';

export const Characteristics = (props) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const [characteristics, setCharacteristics] = useState(null);

  useEffect(() => {
    document.title = (props.character.about.name + " / Characteristics - Hero Sheet");

    setCharacteristics(props.character.characteristics);

		setLoading(false);
  }, [props.character]);

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {modal && <CharacteristicsModal characteristics={characteristics} closeModal={setModal} uid={props.user.uid} charId={props.character.id}/>}

        <div>STR: {characteristics.str}</div>
        
        <div>DEX: {characteristics.dex}</div>

        <div>CON: {characteristics.con}</div>

        <div>INT: {characteristics.int}</div>

        <div>EGO: {characteristics.ego}</div>

        <div>OCV: {characteristics.ocv}</div>

        <div>DCV: {characteristics.dcv}</div>

        <div>OMCV: {characteristics.omcv}</div>

        <div>DMCV: {characteristics.dmcv}</div>

        <div>SPD: {characteristics.spd}</div>

        <div>PD: {characteristics.pd}</div>

        <div>ED: {characteristics.ed}</div>

        <div>REC: {characteristics.rec}</div>

        <div>END: {characteristics.end}</div>

        <div>BODY: {characteristics.body}</div>

        <div>STUN: {characteristics.stun}</div>

        <div>RUNNING: {characteristics.running}</div>

        <div>SWIMMING: {characteristics.swimming}</div>

        <div>LEAPING: {characteristics.leaping}</div>

        {!modal && <button type="button" className="save button" onClick={() => (setModal(true))}>Edit</button>}
      </div>
  );
}
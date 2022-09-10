import { useEffect, useState } from 'react';
import { AboutModal } from '../modals/about_modal';

import { FaEdit } from "react-icons/fa";

export const About = (props) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const [about, setAbout] = useState(null);
  const [back, setBack] = useState(null);

  useEffect(() => {
    document.title = (props.character.basic_info.info.name + " / About - Hero Sheet");

    setAbout(props.character.basic_info);
    setBack(props.character.background)

		setLoading(false);
  }, [props.character]);

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {modal && <AboutModal about={about} back={back} closeModal={setModal} uid={props.user.uid} charId={props.character.id}/>}

        <div><span className="about-title">Name:</span><span> {about.info.name}</span></div>
        <div><span className="about-title">Other Names:</span><span> {about.info.alternates}</span></div>
        <hr className="solid"/>
        <div className="about-title">Background:</div><div className="about-content">{back.history}</div>
        <hr className="solid"/>
        <div className="about-title">Personality:</div><div className="about-content">{back.personality}</div>
        <hr className="solid"/>
        <div className="about-title">Quote:</div><div className="about-content" style={{fontStyle: "italic"}}>{back.quote}</div>
        <hr className="solid"/>
        <div className="about-title">Tactics:</div><div className="about-content">{back.tactics}</div>
        <hr className="solid"/>
        <div className="about-title">Useage:</div><div className="about-content">{back.useage}</div>
        <hr className="solid"/>
        <div className="about-title">Appearance:</div><div className="about-content">{back.appearance}</div>

        {!modal && <button type="button" className="edit button" onClick={() => (setModal(true))}><FaEdit/></button>}
      </div>
  );
}
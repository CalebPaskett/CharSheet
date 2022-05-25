import { useEffect, useState } from 'react';
import { AboutModal } from '../modals/about_modal';

import { FaEdit } from "react-icons/fa";

export const About = (props) => {
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const [about, setAbout] = useState(null);

  useEffect(() => {
    document.title = (props.character.about.name + " / About - Hero Sheet");

    setAbout(props.character.about);

		setLoading(false);
  }, [props.character]);

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        {modal && <AboutModal about={about} closeModal={setModal} uid={props.user.uid} charId={props.character.id}/>}

        <div><span className="about-title">Name:</span><span> {about.name}</span></div>
        <div><span className="about-title">Other Names:</span><span> {about.nicknames}</span></div>
        <hr className="solid"/>
        <div className="about-title">Background:</div><div className="about-content">{about.background}</div>
        <hr className="solid"/>
        <div className="about-title">Personality:</div><div className="about-content">{about.personality}</div>
        <hr className="solid"/>
        <div className="about-title">Quote:</div><div className="about-content" style={{fontStyle: "italic"}}>{about.quote}</div>
        <hr className="solid"/>
        <div className="about-title">Tactics:</div><div className="about-content">{about.tactics}</div>
        <hr className="solid"/>
        <div className="about-title">Useage:</div><div className="about-content">{about.useage}</div>
        <hr className="solid"/>
        <div className="about-title">Appearance:</div><div className="about-content">{about.appearance}</div>

        {!modal && <button type="button" className="save button" onClick={() => (setModal(true))}><FaEdit/></button>}
      </div>
  );
}
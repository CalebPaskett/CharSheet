import { useEffect, useState } from 'react';
import { setDoc, doc, getFirestore, deleteDoc } from "firebase/firestore";

export const Settings = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = (props.character.about.name + " / Settings - Hero Sheet");

		setLoading(false);
  }, [props.character.about.name]);

  const deleteCharacter = async () => {
    const db = getFirestore();
    await deleteDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id));
    window.location.reload();
  }

  const extractHDC = async () => {
    setLoading(true);

    var files = document.getElementById('hdc').files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
      var result = event.target.result;

      var xml2js = require('xml2js');

      var parser = new xml2js.Parser({explicitArray: false, mergeAttrs: true});
      parser.parseStringPromise(result).then(function (json) {
        console.log(json);
        importHDC(json);
      })
      .catch(function (err) {
        console.log('Error reading file: ' + err);
      });
    };
    reader.readAsText(files[0]);
  }

  const importHDC = async (json) => {
    const db = getFirestore();

    var aboutDat = json.CHARACTER.CHARACTER_INFO;
    var about = {
      name: aboutDat.CHARACTER_NAME,
      nicknames: aboutDat.ALTERNATE_IDENTITIES,
      background: aboutDat.BACKGROUND,
      personality: aboutDat.PERSONALITY,
      quote: aboutDat.QUOTE,
      tactics: aboutDat.TACTICS,
      useage: aboutDat.CAMPAIGN_USE,
      appearance: aboutDat.APPEARANCE,
    };

    var charDat = json.CHARACTER.CHARACTERISTICS;
    var characteristics = {
      str: (10+parseInt(charDat.STR.LEVELS)),
      dex: (10+parseInt(charDat.DEX.LEVELS)),
      con: (10+parseInt(charDat.CON.LEVELS)),
      int: (10+parseInt(charDat.INT.LEVELS)),
      ego: (10+parseInt(charDat.EGO.LEVELS)),
      pre: (10+parseInt(charDat.PRE.LEVELS)),
      ocv: (3+parseInt(charDat.OCV.LEVELS)),
      dcv: (3+parseInt(charDat.DCV.LEVELS)),
      omcv: (3+parseInt(charDat.OMCV.LEVELS)),
      dmcv: (3+parseInt(charDat.DMCV.LEVELS)),
      spd: (2+parseInt(charDat.SPD.LEVELS)),
      pd: (2+parseInt(charDat.PD.LEVELS)),
      ed: (2+parseInt(charDat.ED.LEVELS)),
      rec: (4+parseInt(charDat.REC.LEVELS)),
      end: (20+parseInt(charDat.END.LEVELS)),
      body: (10+parseInt(charDat.BODY.LEVELS)),
      stun: (20+parseInt(charDat.END.LEVELS)),
      running: (12+parseInt(charDat.BODY.LEVELS)),
      swimming: (4+parseInt(charDat.REC.LEVELS)),
      leaping: (4+parseInt(charDat.LEAPING.LEVELS)),
    };
      
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
        about: about,
        characteristics: characteristics,
    }, {merge: true});

      setLoading(false);
  }

  if (loading) {
    <div className='loading'>
      <div className='loader'></div>
    </div>
  }

  return (
      <div>
        <button type="button" className='button' onClick={deleteCharacter}>DELETE CHARACTER</button>

        <div>Import from HDC (unfinished)</div>
        <input type="file" id="hdc" accept=".hdc"></input>
        <button type="button" className='button' onClick={extractHDC}>IMPORT</button>
      </div>
  );
}
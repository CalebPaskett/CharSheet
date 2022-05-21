import { useEffect, useState } from 'react';
import {doc, setDoc, getFirestore} from "firebase/firestore";

export const Characteristics = (props) => {
  const [loading, setLoading] = useState(true);
  const [saveStat, setSaveStat] = useState("Save Changes")

  const [str, setstr] = useState("");
  const [dex, setdex] = useState("");
  const [con, setcon] = useState("");
  const [int, setint] = useState("");
  const [ego, setego] = useState("");
  const [pre, setpre] = useState("");
  const [ocv, setocv] = useState("");
  const [dcv, setdcv] = useState("");
  const [omcv, setomcv] = useState("");
  const [dmcv, setdmcv] = useState("");
  const [spd, setspd] = useState("");
  const [pd, setpd] = useState("");
  const [ed, seted] = useState("");
  const [rec, setrec] = useState("");
  const [end, setend] = useState("");
  const [body, setbody] = useState("");
  const [stun, setstun] = useState("");
  const [running, setrunning] = useState("");
  const [swimming, setswimming] = useState("");
  const [leaping, setleaping] = useState("");

  useEffect(() => {
    document.title = (props.character.about.name + " / Characteristics - Hero Sheet");

    setstr(props.character.characteristics.str);
    setdex(props.character.characteristics.dex);
    setcon(props.character.characteristics.con);
    setint(props.character.characteristics.int);
    setego(props.character.characteristics.ego);
    setpre(props.character.characteristics.pre);
    setocv(props.character.characteristics.ocv);
    setdcv(props.character.characteristics.dcv);
    setomcv(props.character.characteristics.omcv);
    setdmcv(props.character.characteristics.dmcv);
    setspd(props.character.characteristics.spd);
    setpd(props.character.characteristics.pd);
    seted(props.character.characteristics.ed);
    setrec(props.character.characteristics.rec);
    setend(props.character.characteristics.end);
    setbody(props.character.characteristics.body);
    setstun(props.character.characteristics.stun);
    setrunning(props.character.characteristics.running);
    setswimming(props.character.characteristics.swimming);
    setleaping(props.character.characteristics.leaping);

		setLoading(false);
  }, [props.character]);

  const saveChanges = async () => {
    setSaveStat("Saving...")

    var characteristics = {
      str: str,
      dex: dex,
      con: con,
      int: int,
      ego: ego,
      pre: pre,
      ocv: ocv,
      dcv: dcv,
      omcv: omcv,
      dmcv: dmcv,
      spd: spd,
      pd: pd,
      ed: ed,
      rec: rec,
      end: end,
      body: body,
      stun: stun,
      running: running,
      swimming: swimming,
      leaping: leaping,
    }

    const db = getFirestore();
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
			characteristics: characteristics,
    }, {merge: true})

    setSaveStat("Saved!");
    setTimeout(function() {setSaveStat("Save Changes");}, 500);
  }

  if (loading) {
    return <div></div>;
  }

  return (
      <div>
        <div>STR: <input type="text" value={str} onChange={(e) =>setstr(e.target.value)}/></div>
        
        <div>DEX: <input type="text" value={dex} onChange={(e) =>setdex(e.target.value)}/></div>

        <div>CON: <input type="text" value={con} onChange={(e) =>setcon(e.target.value)}/></div>

        <div>INT: <input type="text" value={int} onChange={(e) =>setint(e.target.value)}/></div>

        <div>EGO: <input type="text" value={ego} onChange={(e) =>setego(e.target.value)}/></div>

        <div>OCV: <input type="text" value={ocv} onChange={(e) =>setocv(e.target.value)}/></div>

        <div>DCV: <input type="text" value={dcv} onChange={(e) =>setdcv(e.target.value)}/></div>

        <div>OMCV: <input type="text" value={omcv} onChange={(e) =>setomcv(e.target.value)}/></div>

        <div>DMCV: <input type="text" value={dmcv} onChange={(e) =>setdmcv(e.target.value)}/></div>

        <div>SPD: <input type="text" value={spd} onChange={(e) =>setspd(e.target.value)}/></div>

        <div>PD: <input type="text" value={pd} onChange={(e) =>setpd(e.target.value)}/></div>

        <div>ED: <input type="text" value={ed} onChange={(e) =>seted(e.target.value)}/></div>

        <div>REC: <input type="text" value={rec} onChange={(e) =>setrec(e.target.value)}/></div>

        <div>END: <input type="text" value={end} onChange={(e) =>setend(e.target.value)}/></div>

        <div>BODY: <input type="text" value={body} onChange={(e) =>setbody(e.target.value)}/></div>

        <div>STUN: <input type="text" value={stun} onChange={(e) =>setstun(e.target.value)}/></div>

        <div>RUNNING: <input type="text" value={running} onChange={(e) =>setrunning(e.target.value)}/></div>

        <div>SWIMMING: <input type="text" value={swimming} onChange={(e) =>setswimming(e.target.value)}/></div>

        <div>LEAPING: <input type="text" value={leaping} onChange={(e) =>setleaping(e.target.value)}/></div>

        <button type="button" className="save button" onClick={saveChanges}>{saveStat}</button>
      </div>
  );
}
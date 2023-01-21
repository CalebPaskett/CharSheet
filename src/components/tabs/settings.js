import { useEffect, useState } from 'react';
import { setDoc, doc, getFirestore, deleteDoc } from "firebase/firestore";

export const Settings = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = (props.character.basic_info.info.name + " / Settings - Hero Sheet");

		setLoading(false);
  }, [props.character.basic_info.info.name]);

  const deleteCharacter = async () => {
    const db = getFirestore();
    await deleteDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id));
    window.location.reload();
  }

  const importChar = async () => {
    setLoading(true);

    var files = document.getElementById('json').files;
    if (files.length === 0) {
        console.log('No file is selected');
        return;
    }

    var reader = new FileReader();
    reader.onload = function(event) {
      var result = event.target.result;
      var json = JSON.parse(result);

      saveChar(json);
    };
    reader.readAsText(files[0]);
  }

  const saveChar = async (json) => {
    const db = getFirestore();

    var basic_info = json.basic_info;

    var background = json.background;

    var characteristics = json.characteristics;

    var listHead = null;

    var skills = [];
    for (var skill of json.skills) {
      // Handle special types
      if (skill.enhancer == null) {
        skill.enhancer = false;
      }
      if (skill.everyman == null) {
        skill.everyman = false;
      }

      //Handle separators
      if (skill.separator == null) {
        skill.separator = false; 
      }
      else {
        var sep = {
          notes: skill.notes,
          separator: true
        }
        skills.push(sep);
        continue;
      }

      // Handle lists
      // Identify heads of lists
      if (skill.list != null) {
        if (listHead != null) {
          listHead = null;
        }
        listHead = skill;
        listHead.contents = [];
        skills.push(listHead);
      }
      else {
        skill.list = false;
      }

      //Add to lists
      if (listHead !== null && skill.list === false) {
        //End finished lists
        if (skill.list_pos == null) {
          listHead = null;   
          skills.push(skill);
        }
        //Add to unfinished lists
        else {
          listHead.contents.push(skill);
        } 
      }
      //Just add to skill is not in a list
      else if (skill.list === false) {   
          skills.push(skill);
      }
    };

    var perks = [];
    listHead = null;
    for (var perk of json.perks) {
      if (perks.list != null) {
        if (listHead != null) {
          listHead = null;
        }
        listHead = perk;
        listHead.contents = [];
        perks.push(listHead);
      }

      if (listHead != null && perk.list == null) {
        if (perk.list_pos == null) {
          listHead = null;   
          perks.push(perk);
        }
        else {
          listHead.contents.push(perk);
        } 
      }
      else if (perk.list == null) {   
        perks.push(perk);
      }
    };

    var talents = [];
    listHead = null;
    for (var talent of json.talents) {
      if (talent.list != null) {
        if (listHead != null) {
          listHead = null;
        }
        listHead = talent;
        listHead.contents = [];
        talents.push(listHead);
      }

      if (listHead != null && talent.list == null) {
        if (talent.list_pos == null) {
          listHead = null;   
          talents.push(talent);
        }
        else {
          listHead.contents.push(talent);
        } 
      }
      else if (talent.list == null) {   
          talents.push(talent);
      }
    };

    var martials = [];
    listHead = null;
    for (var martial of json.martial) {
      if (martial.list != null) {
        if (listHead != null) {
          listHead = null;
        }
        listHead = martial;
        listHead.contents = [];
        martials.push(listHead);
      }

      if (listHead != null && martial.list == null) {
        if (martial.list_pos == null) {
          listHead = null;   
          martials.push(martial);
        }
        else {
          listHead.contents.push(martial);
        } 
      }
      else if (martial.list == null) {   
          martials.push(martial);
      }
    };

    var powers = [];
    listHead = null;
    for (var power of json.powers) {
      if (power.separator == null) {
        if (power.types.list != null) {
          if (listHead != null) {
            listHead = null;
          }
          listHead = power;
          listHead.contents = [];
          powers.push(listHead);
        }

        if (listHead != null && power.types.list == null) {
          if (power.list_pos == null) {
            listHead = null;   
            powers.push(power);
          }
          else {
            listHead.contents.push(power);
          } 
        }
        else if (power.types.list == null) {   
          powers.push(power);
        }
      }
      else {
        powers.push(power);
      }
    };

    var complications = [];
    listHead = null;
    for (var complication of json.complications) {
      if (complication.list != null) {
        if (listHead != null) {
          listHead = null;
        }
        listHead = complication;
        listHead.contents = [];
        complications.push(listHead);
      }

      if (listHead != null && complication.list == null) {
        if (complication.list_pos == null) {
          listHead = null;   
          complications.push(complication);
        }
        else {
          listHead.contents.push(complication);
        } 
      }
      else if (complication.list == null) {   
          complications.push(complication);
      }
    };
      
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
        basic_info: basic_info,
        background: background,
        characteristics: characteristics,
        skills: skills,
        perks: perks,
        talents: talents,
        martials: martials,
        powers: powers,
        complications: complications,
    }, {merge: true});

      setLoading(false);
  }

  if (loading) {
    return (
      <div className='loading'>
        <div className='loader'></div>
      </div>
    )
  }

  return (
      <div>
        <button type="button" className='button' onClick={deleteCharacter}>DELETE CHARACTER</button>

        <div>Import from Hero Designer (unfinished)</div>
        <div>Use <a href="/JsonExport.hde" download>this hde file</a> to export a Hero Designer character as a .json file, and then upload it below</div>
        <input type="file" id="json" accept=".json"></input>
        <button type="button" className='button' onClick={importChar}>IMPORT</button>
      </div>
  );
}
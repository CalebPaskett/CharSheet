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

    var skills = process_lists(json.skills);
    var perks = process_lists(json.perks);
    var talents = process_lists(json.talents);
    var martials = process_lists(json.martials);
    var powers = process_lists(json.powers);
    var equipment = process_lists(json.equipment);
    var complications = process_lists(json.complications);
      
    await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
        basic_info: basic_info,
        background: background,
        characteristics: characteristics,
        skills: skills,
        perks: perks,
        talents: talents,
        martials: martials,
        powers: powers,
        equipment: equipment,
        complications: complications,
    }, {merge: true});

      setLoading(false);
  }

  const process_lists = (attributes) => {
    var listHead = null;
    var processed_attributes = [];

    for (var attribute of attributes) {
      // Give all attributes contents so they easily can become lists later
      attribute.contents = [];
  
      // If an attribute is a list, open a new list with the attibute as the head
      if (attribute.types.includes("list")) {
        listHead = attribute;
        processed_attributes.push(listHead);
      }
      // Else if a list is already open,
      else if (listHead != null) {
        // Add to the exiting list if part of a list
        if (attribute.list_pos != null) {
          delete attribute.list_pos
          listHead.contents.push(attribute);
        }
        // Otherwise close the list
        else {
          listHead = null;
          processed_attributes.push(attribute);
        } 
      }
      // Else if not a list and no lists are open, just save the attribute
      else {
        processed_attributes.push(attribute);
      }
    }

    return processed_attributes
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

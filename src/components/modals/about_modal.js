import { useEffect, useState } from 'react';

export const AboutModal = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    
  }, []);

  // const saveChanges = async () => {
  //   setSaveStat("Saving...");

  //   var about = {
	// 		name: name,
  //     nicknames: nicknames,
  //     background: background,
  //     personality: personality,
  //     quote: quote,
  //     tactics: tactics,
  //     useage: useage,
  //     appearance: appearance,
  //   }

  //   const db = getFirestore();
  //   await setDoc(doc(db, ("users/"+props.user.uid+"/characters"), props.character.id), {
	// 		about: about,
  //   }, {merge: true})

  //   document.title = (name + " / About - Hero Sheet");
  //   setSaveStat("Saved!");
  //   setTimeout(function() {setSaveStat("Save Changes");}, 500);
  // }

  // if (loading) {
  //   return <div></div>;
  // }

  // return(
  //   <div>
  //     <div className="overlay" onClick={props.closeModal}/>
  //     <div className="modal" onClick={(e) => e.stopPropagation()}>
  //       <span className="title">Modals test</span>
  //       <input type="text" value={name} onChange={e => setName(e.target.value)}/>
  //       <button type="button" className="button" onClicker = {() => createRoom(name)}>Create</button>
  //       <button type="button" className="button" onClick={save}></button>
  //     </div>
  //     {error && <div>namecannotbeblank</div>}
  //   </div>
  // );
}
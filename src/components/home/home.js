import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState, useRef } from 'react';
import { addDoc, collection, onSnapshot, getFirestore } from "firebase/firestore";
import { Route, Routes, Navigate } from 'react-router-dom';

import { IoMdSettings } from 'react-icons/io'
import { IoAccessibilitySharp } from 'react-icons/io5'
import { ImHome } from "react-icons/im";

import { HomeContent } from './home_content';
import { About } from '../tabs/about';
import { Characteristics } from '../tabs/characteristics'
import { Complications } from '../tabs/complications';
import { Martial } from '../tabs/martial';
import { Perks } from '../tabs/perks';
import { Powers } from '../tabs/powers';
import { Skills } from '../tabs/skills';
import { Talents } from '../tabs/talents';
import { Settings } from '../tabs/settings';

export const Home = (props) => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [sideBar, setSideBar] = useState(false);
  const charactersRef = useRef([]);

  useEffect(() => {
    document.title = ("Loading... - Hero Sheet");

    //get characters
    const db = getFirestore();
    const unsubscribe = onSnapshot(collection(db, ("users/"+getAuth().currentUser.uid+"/characters")), (snapshot) => {
			snapshot.docChanges().forEach((change) => {//checks all changes in an update
				if (change.type === "added") {
					charactersRef.current.push({ id: change.doc.id, ...change.doc.data() })
				}
			  if (change.type === "modified") {
					const index = charactersRef.current.findIndex((character) => character.id === change.doc.id);
					charactersRef.current[index] = { id: change.doc.id, ...change.doc.data() };
				}
			});
      setCharacters([...charactersRef.current])
      
      document.title = ("Hero Sheet");
      setLoading(false);
		});
		
		return unsubscribe;
  }, []);

  const genEmptyCharacter = async () => {
    setLoading(true);
    const db = getFirestore();

    var about = {
      name: "New Character",
      nicknames: "",
      background: "",
      personality: "",
      quote: "",
      tactics: "",
      useage: "",
      appearance: "",
    };

    var characteristics = {
      str: "10",
      dex: "10",
      con: "10",
      int: "10",
      ego: "10",
      pre: "10",
      ocv: "3",
      dcv: "3",
      omcv: "3",
      dmcv: "3",
      spd: "2",
      pd: "2",
      ed: "2",
      rec: "4",
      end: "20",
      body: "10",
      stun: "20",
      running: "12",
      swimming: "4",
      leaping: "4",
    };
    
		await addDoc(collection(db, ("users/"+props.user.uid+"/characters")), {
      about: about,
      characteristics: characteristics,
      skills: [],
      perks: [],
      talents: [],
      martials: [],
      powers: [],
      complications: [],
    });

    setCurrentIndex(characters.length);
    window.location.href = "/#/about";
    setLoading(false);
  }

  const logOut = () => {
		const auth = getAuth();
		signOut(auth);
  }

  const changeChar = (index) => {
    setSideBar(false);
    setCurrentIndex(index);
  }

  const returnHome = () => {
    setSideBar(false);
    window.location.href = "/#/";
    setCurrentIndex(null);
  }

  if (loading) {
    return (
      <div className='loading'>
        <div className='loader'></div>
      </div>
    )
  }

  return (
      <div className='primary-container'>
        <header className='top-bar'>
          <nav className='nav-options'>
            <button type="button" className="button" onClick={() => (setSideBar(!sideBar))}><IoAccessibilitySharp /></button>
            
            {(currentIndex != null) && <div>
              <button type="button" className="button" onClick={() => (window.location.href = "/#/about")}>About</button>
              <button type="button" className="button" onClick={() => (window.location.href = "/#/characteristics")}>Characteristics</button>
              <button type="button" className="button" onClick={() => (window.location.href = "/#/skills")}>Skills</button>
              <button type="button" className="button" onClick={() => (window.location.href = "/#/perks")}>Perks</button>
              <button type="button" className="button" onClick={() => (window.location.href = "/#/talents")}>Talents</button>
              <button type="button" className="button" onClick={() => (window.location.href = "/#/martial")}>Martial</button>
              <button type="button" className="button" onClick={() => (window.location.href = "/#/powers")}>Powers</button>
              <button type="button" className="button" onClick={() => (window.location.href = "/#/complications")}>Complications</button>
            </div>}

            <div className='filler'/>
             
            {(currentIndex != null) && <button type="button" className="button" onClick={() => (window.location.href = "/#/settings")}><IoMdSettings/></button>}
            <button type="button" className="button" onClick={returnHome}><ImHome/></button>
            <button type="button" className="button" onClick={logOut}>Logout</button>
          </nav>
        </header>

        <nav className={sideBar ? 'drawer' : 'drawer drawer-close'}> 
          {characters.map((character, index) => (
            <div key={character.id}>
              <button type="button" className="character" onClick={() => (changeChar(index))}>{character.about.name}</button>
            </div>
          ))}
          <button type="button" className="button" onClick={genEmptyCharacter}>New Character</button>
        </nav>
        
        <div className='main-view'>
          {!(currentIndex != null) && <HomeContent characters={characters}/>}

          {(currentIndex != null) && <div>
          <Routes>
            <Route path="about" element={<About user={props.user} character={characters[currentIndex]}/>} />
            <Route path="characteristics" element={<Characteristics user={props.user} character={characters[currentIndex]}/>} />
            <Route path="complications" element={<Complications user={props.user} character={characters[currentIndex]}/>} />
            <Route path="martial" element={<Martial user={props.user} character={characters[currentIndex]}/>} />
            <Route path="perks" element={<Perks user={props.user} character={characters[currentIndex]}/>} />
            <Route path="powers" element={<Powers user={props.user} character={characters[currentIndex]}/>} />
            <Route path="skills" element={<Skills user={props.user} character={characters[currentIndex]}/>} />
            <Route path="talents" element={<Talents user={props.user} character={characters[currentIndex]}/>} />
            <Route path="settings" element={<Settings user={props.user} character={characters[currentIndex]}/>} />

            <Route path="/*" element={<Navigate push to={"about"}/>} />
          </Routes>
          </div>}
        </div>
        
      </div>
  );
}
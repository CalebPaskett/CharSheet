import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState, useRef } from 'react';
import { addDoc, collection, onSnapshot, getFirestore } from "firebase/firestore";
import { Route, Routes, Navigate } from 'react-router-dom';

import { IoMdSettings } from 'react-icons/io';
import { IoAccessibilitySharp } from 'react-icons/io5';
import { ImHome } from "react-icons/im";

import { Home } from '../tabs/home';
import { About } from '../tabs/about';
import { Characteristics } from '../tabs/characteristics';
import { Settings } from '../tabs/settings';
import { Attributes } from '../tabs/attributes';

export const Main = (props) => {
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
      
      setLoading(false);
		});
		
		return unsubscribe;
  }, []);

  const genEmptyCharacter = async () => {
    setLoading(true);
    const db = getFirestore();

    var basic_info = {
      exp: {
        total: 0,
        total_active: 0,			
        base: 0,
        earned: 0,
        spent: 0,
        unspent: 0, 
        complications: 0,
        comp_max: 0,
        characteristics: 0,
        skills: 0,
        perks: 0,
        talents: 0,
        martial: 0,
        powers: 0 
      },
      info: {
        name: "Unnamed Character",
        alternates: "",
        campaign: "",
        genre: "",
        player: "",
        gm: ""
      }
    };
    var background = {
      height: "",
      weight: "",
      eye_color: "",
      hair_color: "",
      history: "",
      personality: "",
      quote: "",
      tactics: '',
      useage: "",
      appearance: ""
    };
    var characteristics = {
      str: {
        value: 10,
        total: 10,
        base: 10,
        cost: 0,
        roll: "11-",
        notes: "HTH Damage 2d6  END [2]",
        dice: "2d6",
        lift: "100.0kg",
        end_cost: "2",
        extra: {
          primary: 10,
          primary_roll: 11,
          secondary: 10,
          secondary_roll: 11,
          increase: 0
        }
      },
      dex: {
        value: 10,
        total: 10,
        base: 10,
        cost: 0,
        roll: "11-",
        notes: "",
        initiative: 10,
        extra: {
          primary: 10,
          primary_roll: 11,
          secondary: 10,
          secondary_roll: 11,
          increase: 0
        }
      },
      con: {
        value: 10,
        total: 10,
        base: 10,
        cost: 0,
        roll: "11-",
        notes: "",
        extra: {
          primary: 10,
          primary_roll: 11,
          secondary: 10,
          secondary_roll: 11,
          increase: 0
        }
      },
      int: {
        value: 10,
        total: 10,
        base: 10,
        cost: 0,
        roll: "11-",
        per: "11-",
        notes: "PER Roll 11-",
        extra: {
          primary: 10,
          primary_roll: 11,
          secondary: 10,
          secondary_roll: 11,
          increase: 0
        }
      },
      ego: {
        value: 10,
        total: 10,
        base: 10,
        cost: 0,
        roll: "11-",
        notes: "",
        extra: {
          primary: 10,
          primary_roll: 11,
          secondary: 10,
          secondary_roll: 11,
          increase: 0
        }
      },
      pre: {
        value: 10,
        total: 10,
        base: 10,
        cost: 0,
        roll: "11-",
        notes: "PRE Attack: 2d6",
        dice: "2d6",
        attack: "2d6",
        extra: {
          primary: 10,
          primary_roll: 11,
          secondary: 10,
          secondary_roll: 11,
          increase: 0
        }
      },
      ocv: {
        value: 3,
        total: 3,
        base: 3,
        cost: 0,
        notes: "",
        extra: {
          primary: 3,
          primary_roll: 10,
          secondary: 3,
          secondary_roll: 10,
          increase: 0
        }
      },
      dcv: {
        value: 3,
        total: 3,
        base: 3,
        cost: 0,
        notes: "",
        from_size: "",
        extra: {
          primary: 3,
          primary_roll: 10,
          secondary: 3,
          secondary_roll: 10,
          increase: 0
        }
      },
      omcv: {
        value: 3,
        total: 3,
        base: 3,
        cost: 0,
        notes: "",
        extra: {
          primary: 3,
          primary_roll: 10,
          secondary: 3,
          secondary_roll: 10,
          increase: 0
        }
      },
      dmcv: {
        value: 3,
        total: 3,
        base: 3,
        cost: 0,
        notes: "",
        extra: {
          primary: 3,
          primary_roll: 10,
          secondary: 3,
          secondary_roll: 10,
          increase: 0
        }
      },
      spd: {
        value: 2,
        total: 2,
        base: 2.0,
        cost: 0,
        notes: "Phases:  6, 12",
        extra: {
          primary: 2,
          primary_roll: 9,
          secondary: 2,
          secondary_roll: 9,
          increase: 0
        }
      },
      pd: {
        value: 2,
        total: 2,
        base: 2,
        cost: 0,
        nonresistant: 2,
        resistant: 0,
        notes: "2 PD (0 rPD)",
        extra: {
          primary: 2,
          primary_roll: 9,
          secondary: 2,
          secondary_roll: 9,
          increase: 0
        }
      },
      ed: {
        value: 2,
        total: 2,
        base: 2,
        cost: 0,
        nonresistant: 2,
        resistant: 0,
        notes: "2 ED (0 rED)",
        extra: {
          primary: 2,
          primary_roll: 9,
          secondary: 2,
          secondary_roll: 9,
          increase: 0
        }
      },
      rec: {
        value: 4,
        total: 4,
        base: 4,
        cost: 0,
        notes: "",
        extra: {
          primary: 4,
          primary_roll: 10,
          secondary: 4,
          secondary_roll: 10,
          increase: 0
        }
      },
      end: {
        value: 20,
        total: 20,
        base: 20,
        cost: 0,
        notes: "",
        extra: {
          primary: 20,
          primary_roll: 13,
          secondary: 20,
          secondary_roll: 13,
          increase: 0
        }
      },
      body: {
        value: 10,
        total: 10,
        base: 10,
        cost: 0,
        notes: "",
        extra: {
          primary: 10,
          primary_roll: 11,
          secondary: 10,
          secondary_roll: 11,
          increase: 0
        }
      },
      stun: {
        value: 20,
        total: 20,
        base: 20,
        cost: 0,
        notes: "",
        extra: {
          primary: 20,
          primary_roll: 13,
          secondary: 20,
          secondary_roll: 13,
          increase: 0
        }
      },
      movement: {
        running: {
          value: 12,
          combat: "12m",
          noncombat: "24m",
          base: 12,
          cost: 0,
          notes: "END [1]",
          extra: {
            primary: 12,
            primary_noncombat: "24m",
            secondary: 12,
            secondary_noncombat: "24m",
            increase: 0
          }
        },
        swimming: {
          value: 4,
          combat: "4m",
          noncombat: "8m",
          base: 4,
          cost: 0,
          notes: "END [1]",
          extra: {
            primary: 4,
            primary_noncombat: "8m",
            secondary: 4,
            secondary_noncombat: "8m",
            increase: 0
          }
        },
        leaping: {
          value: 4,
          combat: "4m",
          noncombat: "8m",
          base: 4,
          cost: 0,
          notes: "4m forward, 2m upward",
          extra: {
            primary: "4m/2m",
            primary_noncombat: "8m",
            secondary: "4m/2m",
            secondary_noncombat: "8m",
            increase: 0
          }
        }
      }
    };

		await addDoc(collection(db, ("users/"+props.user.uid+"/characters")), {
      basic_info: basic_info,
      background: background,
      characteristics: characteristics,
      skills: [],
      perks: [],
      talents: [],
      martials: [],
      powers: [],
      complications: [],
      equipment: [],
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
    window.location.href = "/#/home";
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
              <button type="button" className="button" onClick={() => (window.location.href = "/#/equipment")}>Equipment</button>
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
              <button type="button" className="character" onClick={() => (changeChar(index))}>{character.basic_info.info.name}</button>
            </div>
          ))}
          <button type="button" className="button" onClick={genEmptyCharacter}>New Character</button>
        </nav>
        
        <div className='main-view'>
          {(currentIndex == null) && <Home characters={characters}/>}

          {(currentIndex != null) && <div>
          <Routes>
            <Route path="about" element={<About user={props.user} character={characters[currentIndex]}/>} />
            <Route path="characteristics" element={<Characteristics user={props.user} character={characters[currentIndex]}/>} />
            <Route path="complications" element={<Attributes user={props.user} character={characters[currentIndex]} attribute_type="complications"/>} />
            <Route path="equipment" element={<Attributes user={props.user} character={characters[currentIndex]} attribute_type="equipment"/>} />
            <Route path="martial" element={<Attributes user={props.user} character={characters[currentIndex]}  attribute_type="martials"/>} />
            <Route path="perks" element={<Attributes user={props.user} character={characters[currentIndex]} attribute_type="perks"/>} />
            <Route path="powers" element={<Attributes user={props.user} character={characters[currentIndex]} attribute_type="powers"/>} />
            <Route path="skills" element={<Attributes user={props.user} character={characters[currentIndex]} attribute_type="skills"/>} />
            <Route path="talents" element={<Attributes user={props.user} character={characters[currentIndex]} attribute_type="talents"/>} />
            <Route path="settings" element={<Settings user={props.user} character={characters[currentIndex]}/>} />

            <Route path="/*" element={<Navigate push to={"about"}/>} />
          </Routes>
          </div>}
        </div>
        
      </div>
  );
}
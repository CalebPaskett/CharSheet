import { GiTreeBranch, GiLightningStorm, GiWaterSplash, GiVibratingBall, GiTimeTrap, GiTeleport, GiSlap, GiMuscularTorso, GiShouting, GiRun, GiMoonOrbit, GiNightSleep, GiMuscleUp, GiWerewolf, GiInnerSelf, GiDrippingTube, GiExtraTime, GiDna1, GiButterfly, GiBrainTentacle, GiBlindfold, GiMagnetBlast, GiBurningBook, GiPerspectiveDiceSixFacesRandom, GiSun, GiCrackedBallDunk, GiSheikahEye, GiFallingBoulder, GiMeteorImpact, GiSmallFire, GiFocusedLightning, GiStonePile, GiBodySwapping , GiVial, GiAlienStare, GiWhirlwind, GiSittingDog, GiPuppet, GiStarSwirl, GiCyberEye, GiFog, GiPlanetCore   } from "react-icons/gi";
import { TbYinYangFilled } from "react-icons/tb";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { BsSnow2 } from "react-icons/bs";
import { SiAtom } from "react-icons/si";
import { FaRadiation } from "react-icons/fa6";

let icon_dict_handler = {
  get: function(target, name) {
    return target.hasOwnProperty(name) ? target[name] : <></>;
  }
};

let icon_dict = {
  "Acid": <GiVial />,
  "Alien": <GiAlienStare />,
  "Air/Wind": <GiWhirlwind />,
  "Animal": <GiSittingDog />,
  "Body Control": <GiPuppet />,
  "Chi": <TbYinYangFilled />,
  "Cosmic Energy": <GiStarSwirl />,
  "Cyberkinesis": <GiCyberEye />, 
  "Darkness": <GiFog />,
  "Density Alteration": <GiPlanetCore />,
  "Dimensional Manipulation": <GiBodySwapping />,
  "Earth/Stone": <GiStonePile />,
  "Electricity": <GiFocusedLightning />,
  "Emotion Control": <MdOutlineEmojiEmotions />,
  "Fire/Heat": <GiSmallFire />,
  "Force": <GiMeteorImpact />,
  "Gravity": <GiFallingBoulder />,
  "Ice/Cold": <BsSnow2 />,
  "Illusion": <GiSheikahEye />,
  "Kinetic Energy": <GiCrackedBallDunk />,
  "Light": <GiSun />,
  "Luck": <GiPerspectiveDiceSixFacesRandom />,
  "Magic/Mystic": <GiBurningBook />,
  "Magnetism": <GiMagnetBlast />,
  "Martial Arts": <GiBlindfold />,
  "Matter Manipulation": <SiAtom />,
  "Mental/Psionic": <GiBrainTentacle />,
  "Metamorphic": <GiButterfly />,
  "Mutant": <GiDna1 />,
  "Precognition": <GiExtraTime />,
  "Radiation": <FaRadiation />,
  "Serum Based": <GiDrippingTube />,
  "Shape Alteration":  <GiWerewolf/>,
  "Size Alteration": <GiInnerSelf/>,
  "Sleep/Dream": <GiNightSleep />,
  "Solar/Celestial": <GiMoonOrbit />,
  "Sonic": <GiShouting />,
  "Speedster": <GiRun />,
  "Strength/Toughness": <GiMuscularTorso />,
  "Stretching": <GiMuscleUp/>,
  "Telekinetic": <GiSlap />,
  "Teleportation": <GiTeleport />,
  "Time": <GiTimeTrap />,
  "Vibration": <GiVibratingBall />,
  "Water": <GiWaterSplash />,
  "Weather": <GiLightningStorm />,
  "Wood/Plant": <GiTreeBranch/>
};

let icon_dict_proxy = new Proxy(icon_dict, icon_dict_handler);

export const SFXDisplay = (props) => {
  return (icon_dict_proxy[props.sfx])
}
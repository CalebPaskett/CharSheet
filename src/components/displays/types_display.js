import { MdBusinessCenter, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { GiBackForth, GiPointySword, GiBeamsAura, GiBoltShield, GiBrain, GiWingfoot, GiAwareness, GiSwissArmyKnife, GiCardExchange, GiLightningStorm } from "react-icons/gi";
import { TbStar } from "react-icons/tb";
import { FaRegEye } from "react-icons/fa";
import { SlLayers } from "react-icons/sl";

export const TypesDisplay = (props) => {
  return (
    <span>
      {props.types.includes("enhancer") &&        <MdKeyboardDoubleArrowUp />}
      {props.types.includes("everyman") &&        <MdBusinessCenter />}
      {props.types.includes("adjustment") &&      <GiBackForth />}
      {props.types.includes("attack") &&          <GiPointySword />}
      {props.types.includes("body_affecting") &&  <GiBeamsAura />}
      {props.types.includes("defense") &&         <GiBoltShield />}
      {props.types.includes("mental") &&          <GiBrain />}
      {props.types.includes("movement") &&        <GiWingfoot />}
      {props.types.includes("sense_affecting") && <FaRegEye />}
      {props.types.includes("sensory") &&         <GiAwareness />}
      {props.types.includes("special") &&         <TbStar />}
      {props.types.includes("multipower") &&      <GiSwissArmyKnife />}
      {props.types.includes("ec") &&              <GiLightningStorm />}
      {props.types.includes("vpp") &&             <GiCardExchange />}
      {props.types.includes("compound") &&        <SlLayers />}
    </span>
  )
}
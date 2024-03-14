import { MinorEditCard } from './minor_edit_card';

export const AttributeEditCard = (props) => {
  return (<div>
    <div>Name: <input value={props.attribute.name} onChange={(e) => props.setAttribute([...props.parentPath, "name"], e.target.value)}/></div>
    {(typeof props.attribute.levels !== 'undefined') && <div>Levels: <input type="number" value={props.attribute.levels} onChange={(e) => props.setAttribute([...props.parentPath, "levels"], e.target.value)}/></div>}
    {(typeof props.attribute.roll !== 'undefined') &&   <div>Roll: <input value={props.attribute.roll} onChange={(e) => props.setAttribute([...props.parentPath, "roll"], e.target.value)}/></div>}
    {(typeof props.attribute.damage !== 'undefined') && <div>Damage: <input value={props.attribute.damage} onChange={(e) => props.setAttribute([...props.parentPath, "damage"], e.target.value)}/></div>}
    {(typeof props.attribute.end !== 'undefined') &&    <div>END: <input value={props.attribute.end} onChange={(e) => props.setAttribute([...props.parentPath, "end"], e.target.value)}/></div>}
    {(typeof props.attribute.range !== 'undefined') &&  <div>Range: <input value={props.attribute.range} onChange={(e) => props.setAttribute([...props.parentPath, "range"], e.target.value)}/></div>}

    {(typeof props.attribute.phase !== 'undefined') &&  <div>Phase: <input value={props.attribute.phase} onChange={(e) => props.setAttribute([...props.parentPath, "phase"], e.target.value)}/></div>}
    {(typeof props.attribute.ocv !== 'undefined') &&    <div>OCV: <input value={props.attribute.ocv} onChange={(e) => props.setAttribute([...props.parentPath, "ocv"], e.target.value)}/></div>}
    {(typeof props.attribute.dcv !== 'undefined') &&    <div>DCV: <input value={props.attribute.dcv} onChange={(e) => props.setAttribute([...props.parentPath, "dcv"], e.target.value)}/></div>}
    {(typeof props.attribute.effect !== 'undefined') && <div>Effect: <input value={props.attribute.effect} onChange={(e) => props.setAttribute([...props.parentPath, "effect"], e.target.value)}/></div>}


    <div>Notes: <textarea rows="2" value={props.attribute.notes} onChange={(e) => props.setAttribute([...props.parentPath, "notes"], e.target.value)}/></div>

    <details>
      <summary>Costs</summary>
      <div>Total: <input type="number" value={props.attribute.cost.total} onChange={(e) => props.setAttribute([...props.parentPath, "cost", "total"], e.target.value)}/></div>
      <div>Base: <input type="number" value={props.attribute.cost.base} onChange={(e) => props.setAttribute([...props.parentPath, "cost", "base"], e.target.value)}/></div>
      <div>Active: <input type="number" value={props.attribute.cost.active} onChange={(e) => props.setAttribute([...props.parentPath, "cost", "active"], e.target.value)}/></div>
      {props.attribute.types.includes("list")  && <div>List: <input type="number" value={props.attribute.cost.list} onChange={(e) => props.setAttribute([...props.parentPath, "cost", "list"], e.target.value)}/></div>}
      {props.attribute.types.includes("list")  && <div> Active: <input type="number" value={props.attribute.cost.list_active} onChange={(e) => props.setAttribute([...props.parentPath, "cost", "list_active"], e.target.value)}/></div>}
    </details>

    <details>
      <summary>Details</summary>
      <div>Alias: <input value={props.attribute.details.alias} onChange={(e) => props.setAttribute([...props.parentPath, "details", "alias"], e.target.value)}/></div>
      <div>Display: <input value={props.attribute.details.display} onChange={(e) => props.setAttribute([...props.parentPath, "details", "display"], e.target.value)}/></div>
      <div>Text: <input value={props.attribute.details.text} onChange={(e) => props.setAttribute([...props.parentPath, "details", "text"], e.target.value)}/></div>
      <div>Option: <input value={props.attribute.details.option} onChange={(e) => props.setAttribute([...props.parentPath, "details", "option"], e.target.value)}/></div>
      <div>Input: <input value={props.attribute.details.input} onChange={(e) => props.setAttribute([...props.parentPath, "details", "input"], e.target.value)}/></div>
      <div>Sfx: <input value={props.attribute.details.sfx} onChange={(e) => props.setAttribute([...props.parentPath, "details", "sfx"], e.target.value)}/></div>
    </details>

    {props.attribute.types.includes("list")  && <details>
      <summary>Sub-{props.attribute_type.charAt(0).toUpperCase() + props.attribute_type.slice(1)}</summary>
      {props.attribute.contents.map((attribute, index) => (
          <div key={index}>
            <details>
              <summary>{attribute.name}</summary>
              <AttributeEditCard attribute={attribute} attribute_type={props.attribute_type} setAttribute={props.setAttribute} parentPath={[...props.parentPath, "contents", index]}/>
            </details>
          </div>
        ))}
    </details>}

    {(typeof props.attribute.components !== 'undefined' ) && <details>
      <summary>Component Powers</summary>
      {props.attribute.components.map((attribute, index) => (
        <div key={index}>
          <details>
            <summary>{attribute.name}</summary>
            <AttributeEditCard attribute={attribute} attribute_type={props.attribute_type} setAttribute={props.setAttribute} parentPath={[...props.parentPath, "components", index]}/>
          </details>
        </div>
      ))}
    </details>}

    {<details>
      <summary>Modifiers</summary>
      {props.attribute.modifiers.map((modifier, index) => (
          <div key={index}>
            <MinorEditCard index={index} values={modifier} setAttribute={props.setAttribute} parentPath={[...props.parentPath, "modifiers", index]}/>
          </div>
        ))}
    </details>}

    {<details>
      <summary>Adders</summary>
      {props.attribute.adders.map((modifier, index) => (
          <div key={index}>
            <MinorEditCard index={index} values={modifier} setAttribute={props.setAttribute} parentPath={[...props.parentPath, "adders", index]}/>
          </div>
        ))}
    </details>}

    {(props.attribute_type === "skills" || props.attribute_type === "perks") && <><input type="checkbox" id="is_enhancer"        checked={props.attribute.types.includes("enhancer")}        onChange={(e) => props.setAttribute([...props.parentPath, "types", "enhancer"], "toggle")}/>       <label htmlFor="is_enhancer">Enhancer</label><br/></>}
    {(props.attribute_type === "skills") &&                                     <><input type="checkbox" id="is_everyman"        checked={props.attribute.types.includes("everyman")}        onChange={(e) => props.setAttribute([...props.parentPath, "types", "everyman"], "toggle")}/>       <label htmlFor="is_everyman">Everyman</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_adjustment"      checked={props.attribute.types.includes("adjustment")}      onChange={(e) => props.setAttribute([...props.parentPath, "types", "adjustment"], "toggle")}/>     <label htmlFor="is_adjustment">Adjustment Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_attack"          checked={props.attribute.types.includes("attack")}          onChange={(e) => props.setAttribute([...props.parentPath, "types", "attack"], "toggle")}/>         <label htmlFor="is_attack">Attack Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_body_affecting"  checked={props.attribute.types.includes("body_affecting")}  onChange={(e) => props.setAttribute([...props.parentPath, "types", "body_affecting"], "toggle")}/> <label htmlFor="is_body_affecting">Body Affecting Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_defense"         checked={props.attribute.types.includes("defense")}         onChange={(e) => props.setAttribute([...props.parentPath, "types", "defense"], "toggle")}/>        <label htmlFor="is_defense">Defense Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_mental"          checked={props.attribute.types.includes("mental")}          onChange={(e) => props.setAttribute([...props.parentPath, "types", "mental"], "toggle")}/>         <label htmlFor="is_mental">Mental Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_movement"        checked={props.attribute.types.includes("movement")}        onChange={(e) => props.setAttribute([...props.parentPath, "types", "movement"], "toggle")}/>       <label htmlFor="is_movement">Movement Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_sense_affecting" checked={props.attribute.types.includes("sense_affecting")} onChange={(e) => props.setAttribute([...props.parentPath, "types", "sense_affecting"], "toggle")}/><label htmlFor="is_sense_affecting">Sense Affecting Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_sensory"         checked={props.attribute.types.includes("sensory")}         onChange={(e) => props.setAttribute([...props.parentPath, "types", "sensory"], "toggle")}/>        <label htmlFor="is_sensory">Sensory Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_special"         checked={props.attribute.types.includes("special")}         onChange={(e) => props.setAttribute([...props.parentPath, "types", "special"], "toggle")}/>        <label htmlFor="is_special">Special Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_multipower"      checked={props.attribute.types.includes("multipower")}      onChange={(e) => props.setAttribute([...props.parentPath, "types", "multipower"], "toggle")}/>     <label htmlFor="is_multipower">Mulitpower</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_ec"              checked={props.attribute.types.includes("ec")}              onChange={(e) => props.setAttribute([...props.parentPath, "types", "ec"], "toggle")}/>             <label htmlFor="is_ec">EC</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_vpp"             checked={props.attribute.types.includes("vpp")}             onChange={(e) => props.setAttribute([...props.parentPath, "types", "vpp"], "toggle")}/>            <label htmlFor="is_vpp">Variable Power Pool</label><br/></>}
    {(props.parentPath.len === 0) &&                                            <><input type="checkbox" id="is_list"            checked={props.attribute.types.includes("list")}            onChange={(e) => props.setAttribute([...props.parentPath, "types", "list"], "toggle")}/>           <label htmlFor="is_list">List</label><br/></>}  
  </div>
  )
}
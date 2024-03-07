import { MinorCard } from './minor_card';

export const AttributeEditCard = (props) => {
  console.log(props.attribute.types)

  return (<div>
    <div>Name: <input value={props.attribute.name} onChange={(e) => props.setAttribute(["name"], e.target.value)}/></div>
    {(typeof props.attribute.levels !== 'undefined') && <div>Levels: <input type="number" value={props.attribute.levels} onChange={(e) => props.setAttribute(["levels"], e.target.value)}/></div>}
    {(typeof props.attribute.roll !== 'undefined' && props.attribute.roll !== "") && <div>Roll: <input value={props.attribute.roll} onChange={(e) => props.setAttribute(["roll"], e.target.value)}/></div>}
    {(typeof props.attribute.damage !== 'undefined' && props.attribute.damage !== "") && <div>Damage: <input value={props.attribute.damage} onChange={(e) => props.setAttribute(["damage"], e.target.value)}/></div>}
    {(typeof props.attribute.end !== 'undefined' && props.attribute.end !== "") && <div>END: <input value={props.attribute.end} onChange={(e) => props.setAttribute(["end"], e.target.value)}/></div>}
    {(typeof props.attribute.range !== 'undefined' && props.attribute.range !== "") && <div>Range: <input value={props.attribute.range} onChange={(e) => props.setAttribute(["range"], e.target.value)}/></div>}
    <div>Notes: <textarea rows="2" value={props.attribute.notes} onChange={(e) => props.setAttribute(["notes"], e.target.value)}/></div>

    <details>
      <summary>Costs</summary>
      <div>Total: <input type="number" value={props.attribute.cost.total} onChange={(e) => props.setAttribute(["cost", "total"], e.target.value)}/></div>
      <div>Base: <input type="number" value={props.attribute.cost.base} onChange={(e) => props.setAttribute(["cost", "base"], e.target.value)}/></div>
      <div>Active: <input type="number" value={props.attribute.cost.active} onChange={(e) => props.setAttribute(["cost", "active"], e.target.value)}/></div>
      {props.attribute.types.includes("list")  && <div>List: <input type="number" value={props.attribute.cost.list} onChange={(e) => props.setAttribute(["cost", "list"], e.target.value)}/></div>}
      {props.attribute.types.includes("list")  && <div> Active: <input type="number" value={props.attribute.cost.list_active} onChange={(e) => props.setAttribute(["cost", "list_active"], e.target.value)}/></div>}
    </details>

    <details>
      <summary>Details</summary>
      <div>Alias: <input value={props.attribute.details.alias} onChange={(e) => props.setAttribute(["details", "alias"], e.target.value)}/></div>
      <div>Display: <input value={props.attribute.details.display} onChange={(e) => props.setAttribute(["details", "display"], e.target.value)}/></div>
      <div>Text: <input value={props.attribute.details.text} onChange={(e) => props.setAttribute(["details", "text"], e.target.value)}/></div>
      <div>Option: <input value={props.attribute.details.option} onChange={(e) => props.setAttribute(["details", "option"], e.target.value)}/></div>
      <div>Input: <input value={props.attribute.details.input} onChange={(e) => props.setAttribute(["details", "input"], e.target.value)}/></div>
      <div>Sfx: <input value={props.attribute.details.sfx} onChange={(e) => props.setAttribute(["details", "sfx"], e.target.value)}/></div>
    </details>

    {props.attribute.types.includes("list")  && <details>
      <summary>Sub-{props.attribute_type.charAt(0).toUpperCase() + props.attribute_type.slice(1)}</summary>
      {props.attribute.contents.map((attribute, index) => (
          <div key={index}>
            <details>
              <summary>{attribute.name}</summary>
              <AttributeEditCard index={index} attribute={attribute} userId={props.userId} characterId={props.characterId} is_sub={true}/>
            </details>
          </div>
        ))}
    </details>}

    {(typeof props.attribute.components !== 'undefined' ) && <details>
      <summary>Component Powers</summary>
      {props.attribute.components.map((attribute, index) => (
        <div key={index}>
          <summary>{attribute.name}</summary>
          <AttributeEditCard index={index} attribute={attribute} userId={props.userId} characterId={props.characterId} is_sub={true}/>
        </div>
      ))}
    </details>}

    {<details>
      <summary>Modifiers</summary>
      {props.attribute.modifiers.map((modifier, index) => (
          <div key={index}>
            <MinorCard index={index} values={modifier}/>
          </div>
        ))}
    </details>}

    {<details>
      <summary>Adders</summary>
      {props.attribute.adders.map((modifier, index) => (
          <div key={index}>
            <MinorCard index={index} values={modifier}/>
          </div>
        ))}
    </details>}

    {(props.attribute_type === "skills" || props.attribute_type === "perks") && <><input type="checkbox" id="is_enhancer"        checked={props.attribute.types.includes("enhancer")}        onChange={(e) => props.toggleType("enhancer")}/>       <label htmlFor="is_enhancer">Enhancer</label><br/></>}
    {(props.attribute_type === "skills") &&                                     <><input type="checkbox" id="is_everyman"        checked={props.attribute.types.includes("everyman")}        onChange={(e) => props.toggleType("everyman")}/>       <label htmlFor="is_everyman">Everyman</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_adjustment"      checked={props.attribute.types.includes("adjustment")}      onChange={(e) => props.toggleType("adjustment")}/>     <label htmlFor="is_adjustment">Adjustment Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_attack"          checked={props.attribute.types.includes("attack")}          onChange={(e) => props.toggleType("attack")}/>         <label htmlFor="is_attack">Attack Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_body_affecting"  checked={props.attribute.types.includes("body_affecting")}  onChange={(e) => props.toggleType("body_affecting")}/> <label htmlFor="is_body_affecting">Body Affecting Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_defense"         checked={props.attribute.types.includes("defense")}         onChange={(e) => props.toggleType("defense")}/>        <label htmlFor="is_defense">Defense Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_mental"          checked={props.attribute.types.includes("mental")}          onChange={(e) => props.toggleType("mental")}/>         <label htmlFor="is_mental">Mental Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_movement"        checked={props.attribute.types.includes("movement")}        onChange={(e) => props.toggleType("movement")}/>       <label htmlFor="is_movement">Movement Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_sense_affecting" checked={props.attribute.types.includes("sense_affecting")} onChange={(e) => props.toggleType("sense_affecting")}/><label htmlFor="is_sense_affecting">Aense Affecting Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_sensory"         checked={props.attribute.types.includes("sensory")}         onChange={(e) => props.toggleType("sensory")}/>        <label htmlFor="is_sensory">Sensory Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_special"         checked={props.attribute.types.includes("special")}         onChange={(e) => props.toggleType("special")}/>        <label htmlFor="is_special">Special Power</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_multipower"      checked={props.attribute.types.includes("multipower")}      onChange={(e) => props.toggleType("multipower")}/>     <label htmlFor="is_multipower">Mulitpower</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_ec"              checked={props.attribute.types.includes("ec")}              onChange={(e) => props.toggleType("ec")}/>             <label htmlFor="is_ec">EC</label><br/></>}
    {(props.attribute_type === "powers") &&                                     <><input type="checkbox" id="is_vpp"             checked={props.attribute.types.includes("vpp")}             onChange={(e) => props.toggleType("vpp")}/>            <label htmlFor="is_vpp">Variable Power Pool</label><br/></>}
    {(!props.is_sub) &&                                                         <><input type="checkbox" id="is_list"            checked={props.attribute.types.includes("list")}            onChange={(e) => props.toggleType("list")}/>           <label htmlFor="is_list">List</label><br/></>}  
  </div>
  )
}
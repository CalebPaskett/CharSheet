import { MinorCard } from './minor_card';

export const AttributeEditCard = (props) => {
  return (<div>
    <div>Name: <input value={props.attribute.name} onChange={(e) => props.setAttribute(["name"], e.target.value)}/></div>
    {(typeof props.attribute.levels !== 'undefined') && <div>Levels: <input type="number" value={props.attribute.levels} onChange={(e) => props.setAttribute(["levels"], e.target.value)}/></div>}
    {(typeof props.attribute.roll !== 'undefined' && props.attribute.roll !== "") && <div>Roll: <input value={props.attribute.roll} onChange={(e) => props.setAttribute(["roll"], e.target.value)}/></div>}
    <div>Notes: <textarea rows="2" value={props.attribute.notes} onChange={(e) => props.setAttribute(["notes"], e.target.value)}/></div>

    <details>
      <summary>Costs</summary>
      <div>Total: <input type="number" value={props.attribute.cost.total} onChange={(e) => props.setAttribute(["cost", "total"], e.target.value)}/></div>
      <div>Base: <input type="number" value={props.attribute.cost.base} onChange={(e) => props.setAttribute(["cost", "base"], e.target.value)}/></div>
      <div>Active: <input type="number" value={props.attribute.cost.active} onChange={(e) => props.setAttribute(["cost", "active"], e.target.value)}/></div>
      {props.attribute.list && <div>List: <input type="number" value={props.attribute.cost.list} onChange={(e) => props.setAttribute(["cost", "list"], e.target.value)}/></div>}
      {props.attribute.list && <div> Active: <input type="number" value={props.attribute.cost.list_active} onChange={(e) => props.setAttribute(["cost", "list_active"], e.target.value)}/></div>}
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

    {props.attribute.list && <details>
      <summary>Sub-{props.attribute_type.charAt(0).toUpperCase()}</summary>
      {props.attribute.contents.map((attribute, index) => (
          <div key={index}>
            <details>
              <summary>{attribute.name}</summary>
              <AttributeEditCard index={index} attribute={attribute} userId={props.userId} characterId={props.characterId}/>
            </details>
          </div>
        ))}
    </details>}

    {(props.attribute.modifiers.length > 0) && <details>
      <summary>Modifiers</summary>
      {props.attribute.modifiers.map((modifier, index) => (
          <div key={index}>
            <MinorCard index={index} values={modifier}/>
          </div>
        ))}
    </details>}

    {(props.attribute.adders.length > 0) && <details>
      <summary>Adders</summary>
      {props.attribute.adders.map((modifier, index) => (
          <div key={index}>
            <MinorCard index={index} values={modifier}/>
          </div>
        ))}
    </details>}

    {(props.attribute_type === "skills" || props.attribute_type === "perks") && <><input type="checkbox" id="is_enhancer" checked={props.attribute.enhancer} onChange={(e) => props.setAttribute(["enhancer"], e.target.checked)}/><label htmlFor="is_enhancer">Enhancer</label><br/></>}
    {(props.attribute_type === "skills") && <><input type="checkbox" id="is_everyman" checked={props.attribute.everyman} onChange={(e) => props.setAttribute(["everyman"], e.target.checked)}/><label htmlFor="is_everyman">Everyman</label></>}
  </div>
  )
}
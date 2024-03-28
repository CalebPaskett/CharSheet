export const MinorEditCard = (props) => {
  return (
    <details>
      <summary>{props.values.name}</summary>
      <div>Name: <input value={props.values.name} onChange={(e) => props.setAttribute([...props.parentPath, "name"], e.target.value)}/></div>
      <div>Levels: <input  type="number" value={props.values.levels} onChange={(e) => props.setAttribute([...props.parentPath, "levels"], e.target.value)}/></div>
      <div>Cost: <input value={props.values.cost} onChange={(e) => props.setAttribute([...props.parentPath, "cost"], e.target.value)}/></div>
      {props.values.value && <div>Value: <input value={props.values.value} onChange={(e) => props.setAttribute([...props.parentPath, "value"], e.target.value)}/></div>}

      <details>
        <summary>Details</summary>
        <div>Display: <input value={props.values.details.display} onChange={(e) => props.setAttribute([...props.parentPath, "details", "display"], e.target.value)}/></div>
        <div>Text: <input value={props.values.details.text} onChange={(e) => props.setAttribute([...props.parentPath, "details", "text"], e.target.value)}/></div>
        <div>Option: <input value={props.values.details.option} onChange={(e) => props.setAttribute([...props.parentPath, "details", "option"], e.target.value)}/></div>
        <div>Input: <input value={props.values.details.input} onChange={(e) => props.setAttribute([...props.parentPath, "details", "input"], e.target.value)}/></div>
      </details>

      {(props.parentPath.length > 0) && <button type="button" onClick={() => props.delSubAttribute([...props.parentPath])}>Delete {props.attributeType.charAt(0).toUpperCase() + ((props.attributeType.slice(-1) === 's') ? props.attributeType.slice(1, -1) : props.attributeType.slice(1))}</button>}
    </details>
  );
}
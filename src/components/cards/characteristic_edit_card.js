export const CharacteristicEditCard = (props) => {
  return (
    <details>
      <summary>{props.name}</summary>
      {(typeof props.values.total !== 'undefined') && <div>Total: <input type="number" value={props.values.total} onChange={(e) => props.setChar([...props.char, "total"], e.target.value)}/></div>}
      <div>Base: <input type="number" value={props.values.base} onChange={(e) => props.setChar([...props.char, "base"], e.target.value)}/></div>
      <div>Point Cost: <input type="number" value={props.values.cost} onChange={(e) => props.setChar([...props.char, "cost"], e.target.value)}/></div>
      <div>Notes: <textarea rows="2" value={props.values.notes} onChange={(e) => props.setChar([...props.char, "notes"], e.target.value)}/></div>
      <div>Value: <input type="number" value={props.values.value} onChange={(e) => props.setChar([...props.char, "value"], e.target.value)}/></div>
      {(typeof props.values.roll !== 'undefined') && <div>Roll: <input value={props.values.roll} onChange={(e) => props.setChar([...props.char, "roll"], e.target.value)}/></div>}
      {(typeof props.values.dice !== 'undefined') && <div>Dice: <input value={props.values.dice} onChange={(e) => props.setChar([...props.char, "dice"], e.target.value)}/></div>}
      {(typeof props.values.lift !== 'undefined') && <div>Lifting Power: <input value={props.values.lift} onChange={(e) => props.setChar([...props.char, "lift"], e.target.value)}/></div>}
      {(typeof props.values.end_cost !== 'undefined') && <div>END Cost: <input value={props.values.end_cost} onChange={(e) => props.setChar([...props.char, "end_cost"], e.target.value)}/></div>}
      {(typeof props.values.initiative !== 'undefined') && <div>Initiative: <input type="number" value={props.values.initiative} onChange={(e) => props.setChar([...props.char, "initiative"], e.target.value)}/></div>}
      {(typeof props.values.per !== 'undefined') && <div>Perception: <input value={props.values.per} onChange={(e) => props.setChar([...props.char, "per"], e.target.value)}/></div>}
      {(typeof props.values.attack !== 'undefined') && <div>Attack: <input value={props.values.attack} onChange={(e) => props.setChar([...props.char, "attack"], e.target.value)}/></div>}
      {(typeof props.values.from_size !== 'undefined') && <div>Bonus from Size: <input value={props.values.from_size} onChange={(e) => props.setChar([...props.char, "from_size"], e.target.value)}/></div>}
      {(typeof props.values.nonresistant !== 'undefined') && <div>Nonresistant: <input value={props.values.nonresistant} onChange={(e) => props.setChar([...props.char, "nonresistant"], e.target.value)}/></div>}
      {(typeof props.values.resistant !== 'undefined') && <div>Resistant: <input value={props.values.resistant} onChange={(e) => props.setChar([...props.char, "resistant"], e.target.value)}/></div>}
      {(typeof props.values.combat !== 'undefined') && <div>Combat: <input value={props.values.combat} onChange={(e) => props.setChar([...props.char, "combat"], e.target.value)}/></div>}
      {(typeof props.values.noncombat !== 'undefined') && <div>Noncombat: <input value={props.values.noncombat} onChange={(e) => props.setChar([...props.char, "noncombat"], e.target.value)}/></div>}
      <details>
        <summary>Primary/Secondary</summary>
        <div>Primary: <input type="number" value={props.values.extra.primary} onChange={(e) => props.setChar([...props.char, "extra", "primary"], e.target.value)}/></div>
        {(typeof props.values.extra.primary_roll !== 'undefined') && <div>Primary Roll: <input value={props.values.extra.primary_roll} onChange={(e) => props.setChar([...props.char, "extra", "primary_roll"], e.target.value)}/></div>}
        {(typeof props.values.extra.primary_noncombat !== 'undefined') && <div>Primary Noncombat: <input value={props.values.extra.primary_noncombat} onChange={(e) => props.setChar([...props.char, "extra", "primary_noncombat"], e.target.value)}/></div>}
        <div>Secondary: <input type="number" value={props.values.extra.secondary} onChange={(e) => props.setChar([...props.char, "extra", "secondary"], e.target.value)}/></div>
        {(typeof props.values.extra.secondary_roll !== 'undefined') && <div>Secondary Roll: <input value={props.values.extra.secondary_roll} onChange={(e) => props.setChar([...props.char, "extra", "secondary_roll"], e.target.value)}/></div>}
        {(typeof props.values.extra.secondary_noncombat !== 'undefined') && <div>Secondary Noncombat: <input value={props.values.extra.secondary_noncombat} onChange={(e) => props.setChar([...props.char, "extra", "secondary_noncombat"], e.target.value)}/></div>}
        <div>Increase: <input type="number" value={props.values.extra.increase} onChange={(e) => props.setChar([...props.char, "extra", "increase"], e.target.value)}/></div>
      </details>
    </details>
  )
}
import { MinorCard } from './minor_card';

export const PerkEditCard = (props) => {
  return (<div>
    {(typeof props.perk.levels !== 'undefined') && <div>Levels: <input type="number" value={props.perk.levels} onChange={(e) => props.setPerk(["levels"], e.target.value)}/></div>}
    {(typeof props.perk.roll !== 'undefined' && props.perk.roll !== "") && <div>Roll: <input value={props.perk.roll} onChange={(e) => props.setPerk(["roll"], e.target.value)}/></div>}
    <div>Notes: <textarea rows="2" value={props.perk.notes} onChange={(e) => props.setPerk(["notes"], e.target.value)}/></div>

    <details>
      <summary>Costs</summary>
      <div>Total: <input type="number" value={props.perk.cost.total} onChange={(e) => props.setPerk(["cost", "total"], e.target.value)}/></div>
      <div>Base: <input type="number" value={props.perk.cost.base} onChange={(e) => props.setPerk(["cost", "base"], e.target.value)}/></div>
      <div>Active: <input type="number" value={props.perk.cost.active} onChange={(e) => props.setPerk(["cost", "active"], e.target.value)}/></div>
      {props.perk.list && <div>List: <input type="number" value={props.perk.cost.list} onChange={(e) => props.setPerk(["cost", "list"], e.target.value)}/></div>}
      {props.perk.list && <div> Active: <input type="number" value={props.perk.cost.list_active} onChange={(e) => props.setPerk(["cost", "list_active"], e.target.value)}/></div>}
    </details>

    <details>
      <summary>Details</summary>
      <div>Alias: <input value={props.perk.details.alias} onChange={(e) => props.setPerk(["details", "alias"], e.target.value)}/></div>
      <div>Display: <input value={props.perk.details.display} onChange={(e) => props.setPerk(["details", "display"], e.target.value)}/></div>
      <div>Text: <input value={props.perk.details.text} onChange={(e) => props.setPerk(["details", "text"], e.target.value)}/></div>
      <div>Option: <input value={props.perk.details.option} onChange={(e) => props.setPerk(["details", "option"], e.target.value)}/></div>
      <div>Input: <input value={props.perk.details.input} onChange={(e) => props.setPerk(["details", "input"], e.target.value)}/></div>
      <div>Sfx: <input value={props.perk.details.sfx} onChange={(e) => props.setPerk(["details", "sfx"], e.target.value)}/></div>
    </details>

    {props.perk.list && <details>
      <summary>Sub-perks</summary>
      {props.perk.contents.map((perk, index) => (
          <div key={index}>
            <details>
              <summary>{perk.name}</summary>
              <PerkEditCard index={index} perk={perk} userId={props.userId} characterId={props.characterId}/>
            </details>
          </div>
        ))}
    </details>}

    {(props.perk.modifiers.length > 0) && <details>
      <summary>Modifiers</summary>
      {props.perk.modifiers.map((modifier, index) => (
          <div key={index}>
            <MinorCard index={index} values={modifier}/>
          </div>
        ))}
    </details>}

    {(props.perk.adders.length > 0) && <details>
      <summary>Adders</summary>
      {props.perk.adders.map((modifier, index) => (
          <div key={index}>
            <MinorCard index={index} values={modifier}/>
          </div>
        ))}
    </details>}

    {props.perk.enhancer && <div>Enhancer</div>}
  </div>


    //   {(typeof props.values.total !== 'undefined') && <div>Total: <input type="number" value={props.values.total} onChange={(e) => props.setChar([...props.char, "total"], e.target.value)}/></div>}
    //   <div>Base: <input type="number" value={props.values.base} onChange={(e) => props.setChar([...props.char, "base"], e.target.value)}/></div>
    //   <div>Point Cost: <input type="number" value={props.values.cost} onChange={(e) => props.setChar([...props.char, "cost"], e.target.value)}/></div>
    //   <div>Notes: <textarea rows="2" value={props.values.notes} onChange={(e) => props.setChar([...props.char, "notes"], e.target.value)}/></div>
    //   <div>Value: <input type="number" value={props.values.value} onChange={(e) => props.setChar([...props.char, "value"], e.target.value)}/></div>
    //   {(typeof props.values.roll !== 'undefined') && <div>Roll: <input value={props.values.roll} onChange={(e) => props.setChar([...props.char, "roll"], e.target.value)}/></div>}
    //   {(typeof props.values.dice !== 'undefined') && <div>Dice: <input value={props.values.dice} onChange={(e) => props.setChar([...props.char, "dice"], e.target.value)}/></div>}
    //   {(typeof props.values.lift !== 'undefined') && <div>Lifting Power: <input value={props.values.lift} onChange={(e) => props.setChar([...props.char, "lift"], e.target.value)}/></div>}
    //   {(typeof props.values.end_cost !== 'undefined') && <div>END Cost: <input value={props.values.end_cost} onChange={(e) => props.setChar([...props.char, "end_cost"], e.target.value)}/></div>}
    //   {(typeof props.values.initiative !== 'undefined') && <div>Initiative: <input type="number" value={props.values.initiative} onChange={(e) => props.setChar([...props.char, "initiative"], e.target.value)}/></div>}
    //   {(typeof props.values.per !== 'undefined') && <div>Perception: <input value={props.values.per} onChange={(e) => props.setChar([...props.char, "per"], e.target.value)}/></div>}
    //   {(typeof props.values.attack !== 'undefined') && <div>Attack: <input value={props.values.attack} onChange={(e) => props.setChar([...props.char, "attack"], e.target.value)}/></div>}
    //   {(typeof props.values.from_size !== 'undefined') && <div>Bonus from Size: <input value={props.values.from_size} onChange={(e) => props.setChar([...props.char, "from_size"], e.target.value)}/></div>}
    //   {(typeof props.values.nonresistant !== 'undefined') && <div>Nonresistant: <input value={props.values.nonresistant} onChange={(e) => props.setChar([...props.char, "nonresistant"], e.target.value)}/></div>}
    //   {(typeof props.values.resistant !== 'undefined') && <div>Resistant: <input value={props.values.resistant} onChange={(e) => props.setChar([...props.char, "resistant"], e.target.value)}/></div>}
    //   {(typeof props.values.combat !== 'undefined') && <div>Combat: <input value={props.values.combat} onChange={(e) => props.setChar([...props.char, "combat"], e.target.value)}/></div>}
    //   {(typeof props.values.noncombat !== 'undefined') && <div>Noncombat: <input value={props.values.noncombat} onChange={(e) => props.setChar([...props.char, "noncombat"], e.target.value)}/></div>}
    //   <details>
    //     <summary>Primary/Secondary</summary>
    //     <div>Primary: <input type="number" value={props.values.extra.primary} onChange={(e) => props.setChar([...props.char, "extra", "primary"], e.target.value)}/></div>
    //     {(typeof props.values.extra.primary_roll !== 'undefined') && <div>Primary Roll: <input value={props.values.extra.primary_roll} onChange={(e) => props.setChar([...props.char, "extra", "primary_roll"], e.target.value)}/></div>}
    //     {(typeof props.values.extra.primary_noncombat !== 'undefined') && <div>Primary Noncombat: <input value={props.values.extra.primary_noncombat} onChange={(e) => props.setChar([...props.char, "extra", "primary_noncombat"], e.target.value)}/></div>}
    //     <div>Secondary: <input type="number" value={props.values.extra.secondary} onChange={(e) => props.setChar([...props.char, "extra", "secondary"], e.target.value)}/></div>
    //     {(typeof props.values.extra.secondary_roll !== 'undefined') && <div>Secondary Roll: <input value={props.values.extra.secondary_roll} onChange={(e) => props.setChar([...props.char, "extra", "secondary_roll"], e.target.value)}/></div>}
    //     {(typeof props.values.extra.secondary_noncombat !== 'undefined') && <div>Secondary Noncombat: <input value={props.values.extra.secondary_noncombat} onChange={(e) => props.setChar([...props.char, "extra", "secondary_noncombat"], e.target.value)}/></div>}
    //     <div>Increase: <input type="number" value={props.values.extra.increase} onChange={(e) => props.setChar([...props.char, "extra", "increase"], e.target.value)}/></div>
    //   </details>
    // </details>
  )
}
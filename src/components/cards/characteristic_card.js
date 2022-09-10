export const CharacteristicCard = (props) => {
  return (
    <details>
      <summary>{props.char}: {(typeof props.values.total !== 'undefined') ? props.values.total : props.values.value}</summary>
      <div>Base: {props.values.base}</div>
      <div>Point Cost: {props.values.cost}</div>
      <div>Notes: {props.values.notes}</div>
      {(typeof props.values.total !== 'undefined') && <div>Value: {props.values.value}</div>}
      {(typeof props.values.roll !== 'undefined') && <div>Roll: {props.values.roll}</div>}
      {(typeof props.values.dice !== 'undefined') && <div>Dice: {props.values.dice}</div>}
      {(typeof props.values.lift !== 'undefined') && <div>Lifting Power: {props.values.lift}</div>}
      {(typeof props.values.end_cost !== 'undefined') && <div>END Cost: {props.values.end_cost}</div>}
      {(typeof props.values.initiative !== 'undefined') && <div>Initiative: {props.values.initiative}</div>}
      {(typeof props.values.per !== 'undefined') && <div>Perception: {props.values.per}</div>}
      {(typeof props.values.attack !== 'undefined') && <div>Attack: {props.values.attack}</div>}
      {(typeof props.values.from_size !== 'undefined') && <div>Bonus from Size: {props.values.from_size}</div>}
      {(typeof props.values.nonresistant !== 'undefined') && <div>Nonresistant: {props.values.nonresistant}</div>}
      {(typeof props.values.resistant !== 'undefined') && <div>Resistant: {props.values.resistant}</div>}
      {(typeof props.values.combat !== 'undefined') && <div>Combat: {props.values.combat}</div>}
      {(typeof props.values.noncombat !== 'undefined') && <div>Noncombat: {props.values.noncombat}</div>}
      <details>
        <summary>Primary/Secondary</summary>
        <div>Primary: {props.values.extra.primary}</div>
        {(typeof props.values.primary_roll !== 'undefined') && <div>Primary Roll: {props.values.primary_roll}</div>}
        {(typeof props.values.primary_noncombat !== 'undefined') && <div>Primary Noncombat: {props.values.primary_noncombat}</div>}
        <div>Secondary: {props.values.extra.secondary}</div>
        {(typeof props.values.secondary_roll !== 'undefined') && <div>Secondary Roll: {props.values.secondary_roll}</div>}
        {(typeof props.values.secondary_noncombat !== 'undefined') && <div>Secondary Noncombat: {props.values.secondary_noncombat}</div>}
        <div>Increase: {props.values.extra.increase}</div>
      </details>
    </details>
  )
}
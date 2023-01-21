export const MinorCard = (props) => {
  return (
    <details>
      <summary>{props.values.name}</summary>
      <div>Levels: {props.values.levels}</div>
      <div>Cost: {props.values.cost}</div>
      <div>Value: {props.values.value}</div>
      {(typeof props.values.value !== 'undefined') && <div>Value: {props.values.value}</div>}

      <details>
        <summary>Details</summary>
        <div>Display: {props.values.details.display}</div>
        <div>Text: {props.values.details.text}</div>
        <div>Option: {props.values.details.option}</div>
        <div>Input: {props.values.details.input}</div>
      </details>
    </details>
  );
}
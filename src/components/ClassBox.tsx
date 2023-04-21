import { useEffect } from "react";

interface ClassBoxProps {
  classes: Array<Array<String>>;
  setClasses: (data: Array<Array<String>>) => void;
  posX: number;
  posY: number;
}

function position(position: number) {
  let tippy: number = 1 + position * 5.5;
  return {
    left: "0.375vw",
    top: tippy.toString() + "vh",
  };
}

export default function SemYear(props: ClassBoxProps) {
  let currentElt = props.classes[props.posX][props.posY];

  function handleClick() {
    // TODO: Handle if class is searched for then box is clicked
    if (currentElt === "" || currentElt === undefined) {
    } else {
      let newArray: Array<Array<String>> = props.classes;
      delete newArray[props.posX][props.posY];
      props.setClasses([...newArray]);
    }
    console.log(props.posX.toString() + ", " + props.posY.toString());
  }

  return (
    <button
      className="SemYear"
      style={position(props.posY + 1)}
      onClick={handleClick}
    >
      {props.classes[props.posX][props.posY] === undefined
        ? ""
        : props.classes[props.posX][props.posY % 4]}
    </button>
  );
}

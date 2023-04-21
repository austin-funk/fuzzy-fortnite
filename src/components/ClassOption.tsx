import { useState } from "react";
import SemYearButton from "./SemYearButton";
import ClassBox from "./ClassBox";

interface ClassOptionProps {
  classes: Array<Array<String>>;
  setClasses: (data: Array<Array<String>>) => void;
}

function position(back: number) {
  let tippy: string;
  let loosey: string;
  if (back >= 4) {
    tippy = "36.75vh";
  } else {
    tippy = "0.75vh";
  }
  let looseyNum: number = (back % 4) * 11.6 + 1;
  loosey = looseyNum.toString() + "vw";
  return {
    left: loosey,
    top: tippy,
  };
}

export default function ClassOption(props: ClassOptionProps) {
  return (
    <div>
      <button
        className="OptionButton"
        style={{ left: "0vw", top: "0vh" }}
        onClick={(e) => console.log(props.classes)}
      >
        Avoid
      </button>

      <button
        className="OptionButton"
        style={{ left: "9.9vw", top: "0vh" }}
        onClick={(e) => console.log(props.classes)}
      >
        Completed
      </button>

      <button
        className="OptionButton"
        style={{ left: "19.8vw", top: "0vh" }}
        onClick={(e) => console.log(props.classes)}
      >
        Take
      </button>
      <div
        className="OptionList"
        style={{ left: "0.375vw", top: "0.5vh" }}
      ></div>
      <div
        className="OptionList"
        style={{ left: "0.375vw", top: "0.5vh" }}
      ></div>
      <div
        className="OptionList"
        style={{ left: "0.375vw", top: "0.5vh" }}
      ></div>
    </div>
  );
}

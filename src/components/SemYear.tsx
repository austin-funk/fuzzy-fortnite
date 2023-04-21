import { useState } from "react";
import SemYearButton from "./SemYearButton";
import ClassBox from "./ClassBox";

interface SemYearProps {
  num: number;
  grad_year: number;
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

export default function SemBackground(props: SemYearProps) {
  let nums: Array<number> = [...Array(5).keys()];
  let numsMap: Map<String, number> = new Map(
    nums.map((n) => [n.toString(), n])
  );
  let numsMapArr = Array.from(numsMap, ([key, value]) => ({ key, value }));

  return (
    <div className="SemBackground" style={position(props.num)}>
      <SemYearButton year={props.grad_year + 0.5 * (props.num - 8)} />
      {numsMapArr.map(({ key, value }) => (
        <ClassBox
          classes={props.classes}
          setClasses={props.setClasses}
          posX={props.num}
          posY={value}
        />
      ))}
    </div>
  );
}

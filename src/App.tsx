import { useEffect, useState } from "react";
import "../styles/App.css";
import Header from "./components/Header";
import HistoryBox from "./components/HistoryBox";
import InputBox from "./components/InputBox";
import { ReturnContents } from "./functions/REPLFunction";
import SemYear from "./components/SemYear";
import ClassOption from "./components/ClassOption";

function App() {
  // TODO: Text box for graduation year controls this hook
  const [gradYear, setGradYear] = useState<number>(2025);
  // Index corresponds to semester number
  const [semClasses, setSemClasses] = useState<Array<Array<String>>>([
    ["something", "anything"],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  // 0 index -> Avoid
  // 1 index -> Completed
  // 2 index -> Take / Want to take
  const [catClasses, setCatClasses] = useState<Array<Array<String>>>([
    [],
    [],
    [],
  ]);
  const [history, setHistory] = useState<Array<ReturnContents>>([]);
  const [isBrief, setIsBrief] = useState<boolean>(true);

  let nums: Array<number> = [...Array(8).keys()];
  let numsMap: Map<String, number> = new Map(
    nums.map((n) => [n.toString(), n])
  );
  let numsMapArr = Array.from(numsMap, ([key, value]) => ({ key, value }));

  return (
    <div>
      <Header />
      <div className="ScheduleBackground">
        {numsMapArr.map(({ key, value }) => (
          <SemYear
            num={value}
            grad_year={gradYear}
            classes={semClasses}
            setClasses={setSemClasses}
          />
        ))}
      </div>
      <div className="ClassOptionBackground">
        <ClassOption classes={catClasses} setClasses={setCatClasses} />
      </div>
      <div>
        {/* <HistoryBox history={history} />

        <hr />
        <InputBox
          history={history}
          setHistory={setHistory}
          isBrief={isBrief}
          setIsBrief={setIsBrief}
        /> */}
      </div>
    </div>
  );
}

export default App;

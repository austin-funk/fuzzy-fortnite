import { ReactNode } from "react";
import { ReturnContents } from "../functions/REPLFunction";

interface HistoryBoxProps {
  history: Array<ReturnContents>;
}

function HistoryBox(props: HistoryBoxProps) {
  return (
    <div
      className="repl-history"
      aria-label="History Box"
      aria-description="Inputted commands are presented in this history box"
      tabIndex={1}

    >
      {/* Map over the history array and display each item in a div */}
      {props.history.map((item, index) => (
        // You may eventually make this a component, but for now it's just a div
        <div
          key={index}
          aria-label={item.ariaLabel}
          aria-description={item.ariaDescr}
        >
          {item.table ? makeTable(item.contents) : makeDivs(item.contents)}
        </div>
      ))}
    </div>
  );
}

//makeLabel(item)

function makeLabel(item: ReturnContents): string {
  return ""
}

function makeDivs(data: string[][]): React.ReactElement {
  let divs: React.ReactElement = <div>{data[0][0]}</div>;
  return divs;
}


function makeTable(tableData: string[][]): React.ReactElement {
  return (
    <table className="center">
      <tbody>{formTable(tableData)}</tbody>
    </table>
  );
}

function formTable(tableData: string[][]): React.ReactElement[] {
  let table: React.ReactElement[] = [];

  for (var i = 0; i < tableData.length; i++) {
    table.push(<tr>{formRow(tableData[i])}</tr>);
  }
  return table;
}

function formRow(rowData: string[]): React.ReactElement[] {
  let row: React.ReactElement[] = [];
  for (var i = 0; i < rowData.length; i++) {
    row.push(<td>{rowData[i]}</td>);
  }
  return row;
}

export default HistoryBox;

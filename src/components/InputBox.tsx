import { useEffect, useState } from "react";
import { REPLFunction, ReturnContents } from "../functions/REPLFunction";
import { load_file } from "../functions/load";
import { search } from "../functions/search";
import { view } from "../functions/view";

// constants for returning strings
const CONTENTS_ERR = "Invalid Contents";
const COMMAND_ERR = "Invalid Command";
const NO_ERR = "No error";

// string representing the current file loaded- if it's empty no file has been loaded
export let fileLoaded: string = "";

// interface for what items the input box deals with in the HTML portion
interface InputBoxProps {
  history: ReturnContents[];
  setHistory: (data: Array<ReturnContents>) => void;
  isBrief: boolean;
  setIsBrief: (data: boolean) => void;
}

// type of object to be passed into the functions
type Cmd = {
  command: string;
  err: string;
  args: string[];
};

// map from command name to related command function
let commandMap = new Map<String, REPLFunction>();

// function for adding a command to the command map
export function addCommand(keyword: string, func: REPLFunction) {
  if (commandMap.has(keyword)) {
    console.log(
      'Error: Unable to add new command "' +
        keyword +
        '" without deleting previous instance.'
    );
    return;
  }
  commandMap.set(keyword, func);
}

// function for deleting a commmand from the command map
export function deleteCommand(keyword: string) {
  if (!commandMap.has(keyword)) {
    console.log(
      'Error: Unable to delete command "' +
        keyword +
        '" since it was not previously added.'
    );
    return;
  }
  commandMap.delete(keyword);
}

// function for checking if a command is in the map
export function commandInMap(keyword: string) {
  return commandMap.has(keyword);
}

// default commands added to the map when the site is loaded
function defaultCommands() {
  addCommand("load_file", load_file);
  addCommand("view", view);
  addCommand("search", search);
}

// function for parsing a user input and turning it into a command object
function splitContents(contents: string): Cmd {
  // split
  const splitLine = contents.split(" ");
  // check that contents is valid length
  if (splitLine.length < 1) {
    return { command: "", err: CONTENTS_ERR, args: [] };
  }
  // check that command is valid
  const cmd = splitLine[0];
  if (!commandMap.has(cmd) && cmd !== "mode") {
    return { command: cmd, err: COMMAND_ERR, args: [] };
  }
  // return
  return { command: cmd, err: NO_ERR, args: splitLine.slice(1) };
}

// main method of the class
export default function InputBox(props: InputBoxProps) {
  const [textbox, setTextbox] = useState("");

  // add default commands
  useEffect(() => {
    commandMap.clear();
    defaultCommands();
    fileLoaded = "";
  }, []);

  /**
   * Handles the submit button being clicked or the enter key being pressed!
   * You may want to make this function more sophisticated to add real
   * command logic, but for now it just adds the text to the history box.
   */
  function handleSubmit() {
    // split command
    const cmds = splitContents(textbox);

    // strings to append
    var toAppend: Array<ReturnContents> = [];
    var modeOutput: ReturnContents = {
      contents: [[""]],
      table: false,
      ariaLabel: "mode",
      ariaDescr: "",
    };

    // check mode for printing
    if (props.isBrief === false && cmds.command !== "mode") {
      toAppend.push({
        contents: [["Command: " + cmds.command]],
        table: false,
        ariaLabel: "verbose first line",
        ariaDescr: "Contains the command entered",
      });
      toAppend.push({
        contents: [["Output:"]],
        table: false,
        ariaLabel: "verbose second line",
        ariaDescr: "Below is the output of the command entered",
      });
    }

    // error checking
    if (cmds.err === CONTENTS_ERR) {
      // no contents given
      modeOutput.contents[0][0] =
        modeOutput.contents[0][0].concat(CONTENTS_ERR);
      modeOutput.ariaLabel = cmds.command;
      modeOutput.ariaDescr = "Error: " + CONTENTS_ERR;
      toAppend.push(modeOutput);
      props.setHistory([...props.history, ...toAppend]);
      setTextbox("");
      return;
    }
    if (cmds.err === COMMAND_ERR) {
      // invalid command
      modeOutput.contents[0][0] = modeOutput.contents[0][0].concat(COMMAND_ERR);
      modeOutput.ariaLabel = cmds.command;
      modeOutput.ariaDescr = "Error: " + COMMAND_ERR;
      toAppend.push(modeOutput);
      props.setHistory([...props.history, ...toAppend]);
      setTextbox("");
      return;
    }
    if (cmds == null) {
      // necessary for ts
      modeOutput.contents[0][0] = modeOutput.contents[0][0].concat(
        "Command cannot be null."
      );
      modeOutput.ariaDescr = "Error: command cannot be null";
      toAppend.push(modeOutput);
      props.setHistory([...props.history, ...toAppend]);
      setTextbox("");
      return;
    }
    // functionality for mode command
    if (cmds.command === "mode") {
      // too many arguments
      if (!(cmds.args.length === 0)) {
        modeOutput.contents[0][0] = modeOutput.contents[0][0].concat(
          "Too many arguments! mode expects 0 arguments, " +
            cmds.args.length.toString() +
            " given."
        );
        modeOutput.ariaDescr = "Error: too many arguments";
        toAppend.push(modeOutput);
        props.setHistory([...props.history, ...toAppend]);
        setTextbox("");
        return;
      }
      // change the state of the website
      props.setIsBrief(props.isBrief === true ? false : true);
      if (props.isBrief === true) {
        toAppend.push({
          contents: [["Command: " + cmds.command]],
          table: false,
          ariaLabel: "verbose first line",
          ariaDescr: "Contains the command entered",
        });
        toAppend.push({
          contents: [["Output:"]],
          table: false,
          ariaLabel: "verbose second line",
          ariaDescr: "Below is the output of the command entered",
        });
      }
      modeOutput.contents[0][0] = modeOutput.contents[0][0].concat(
        "mode switched to " + (props.isBrief ? "verbose" : "brief")
      );
      modeOutput.ariaDescr =
        "mode switched to " + (props.isBrief ? "verbose" : "brief");
      toAppend.push(modeOutput);
      props.setHistory([...props.history, ...toAppend]);
    // functionality for all other commands except mode
    } else {
      // error-checking: do not allow the user to view or search when no file is loaded
      if (cmds.command === "view" && fileLoaded === "") {
        toAppend.push({
          contents: [["Must load a file to view"]],
          table: false,
          ariaLabel: cmds.command,
          ariaDescr: "Error: must load a file to view",
        });
        props.setHistory([...props.history, ...toAppend]);
        setTextbox("");
        return;
      }
      if (cmds.command === "search" && fileLoaded === "") {
        toAppend.push({
          contents: [["Must load a file to search"]],
          table: false,
          ariaLabel: cmds.command,
          ariaDescr: "Error: must load a file to search",
        });
        props.setHistory([...props.history, ...toAppend]);
        setTextbox("");
        return;
      }
      // otherwise run the function stored in the map
      const func = commandMap.get(cmds.command);
      if (typeof func === "undefined") {
        props.setHistory([
          ...props.history,
          {
            contents: [["Command cannot be null."]],
            table: false,
            ariaLabel: cmds.command,
            ariaDescr: "Error: command cannot be null",
          },
        ]);
        setTextbox("");
        return;
      } else {
        // add the output from the function to the history
        func(cmds.args) // type Promise<string>
          .then((response) => {
            if (
              cmds.command === "load_file" &&
              response.contents[0][0] === "File " + cmds.args[0] + " loaded"
            ) {
              fileLoaded = cmds.args[0];
            }
            toAppend.push(response);
            props.setHistory([...props.history, ...toAppend]);
          });
      }
    }

    setTextbox("");
  }

  return (
    <div className="repl-input">
      {/* The text box, which keeps its contents synced with the textbox state */}
      <input
        type="text"
        aria-label="Input Box"
        aria-description="Type commands in this input box"
        className="repl-command-box"
        onChange={(e) => setTextbox(e.target.value)}
        value={textbox}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      {/* The submit button, which calls handleSubmit when clicked */}
      <button
        className="repl-button"
        aria-label="Input Button"
        aria-description="Input button, press to enter commands into the history"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

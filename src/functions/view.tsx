import { REPLFunction, ReturnContents } from "./REPLFunction";


export const view: REPLFunction = async function view(
  args: Array<string>
): Promise<ReturnContents> {
  return new Promise<ReturnContents>((resolve, reject) => {
    // error if incorrect number of arguments
    if (!(args.length === 0)) {
      resolve({
        contents: [["Please do not include any parameters"]],
        table: false,
        ariaLabel: "view",
        ariaDescr: "Error: Parameters inputted where there should be none"
      });
    }
    // query the API
    fetch("http://localhost:3232/viewcsv")
      // retrieve the JSON of the response
      .then((response) => response.json())
      // if the result takes the right shape - if there is no error in the API query
      .then((json) => {
        if (isViewResult(json)) {
          // if the API call returns a table
          if ("data" in json) {
            // build and return the table
            resolve({
              contents: json.data,
              table: true,
              ariaLabel: "view",
              ariaDescr: "View CSV conducted",
            });
          }
          // if the API call fails to return a table, return the error
          if ("error_message" in json) {
            resolve({
              contents: [[json.error_message]],
              table: false,
              ariaLabel: "view",
              ariaDescr: "Error: " + json.error_message
            });
          }
        }
      })
      .catch((e) => {
        resolve({
          contents: [[e.message]],
          table: false,
          ariaLabel: "view",
          ariaDescr: e.message,
        });
      });
  });
};

// interface for a proper view API call
interface ViewResult {
  result: string;
  data: string[][];
  error_message: string;
}

// narrowing functionality for this class
function isViewResult(data: any): data is ViewResult {
  if (!("result" in data)) {
    return false;
  }
  if (!("data" in data || "error_message" in data)) {
    return false;
  }
  return true;
}

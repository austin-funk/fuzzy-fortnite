import { REPLFunction, ReturnContents } from "./REPLFunction";

export const load_file: REPLFunction = async function (
  args: Array<string>
): Promise<ReturnContents> {
  return new Promise<ReturnContents>((resolve, reject) => {
    // error if incorrect number of arguments
    if (!(args.length === 1)) {
      resolve({
        contents: [["Please input a filepath"]],
        table: false,
        ariaLabel: "load_file",
        ariaDescr: "Error: No filepath inputted"
      });
    }
    // store the filepath as a constant
    const filepath = args[0];
    // query the API
    fetch("http://localhost:3232/loadcsv?filepath=" + filepath)
      // retrieve the JSON of the response
      .then((response) => response.json())
      .then((data) => {
        // if the result takes the right shape - if there is no error in the API query
        if (isLoadResult(data)) {
          if ("filepath" in data) {
            // if the API call returns a filepath, return the success
            resolve({
              contents: [["File " + data.filepath + " loaded"]],
              table: false,
              ariaLabel: "load_file",
              ariaDescr: "File " + data.filepath + " loaded",
            });
          }
          if ("error_message" in data) {
            // if the API call fails to return a filepath, return the error
            resolve({
              contents: [[data.error_message]],
              table: false,
              ariaLabel: "load_file",
              ariaDescr: "Error: " + data.error_message
            });
          }
        }
      })
      // if the API call fails, return the error
      .catch((e) => {
        resolve({
          contents: [[e.message]],
          table: false,
          ariaLabel: "load_file",
          ariaDescr: "Error: " + e.message
        });
      });
  });
};

// interface for a proper load_file API call
interface LoadResult {
  result: string;
  error_message: string;
}

// narrowing functionality for this class
function isLoadResult(data: any): data is LoadResult {
  if (!("result" in data)) {
    return false;
  }
  return true;
}

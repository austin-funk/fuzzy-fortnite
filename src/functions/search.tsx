import { REPLFunction, ReturnContents } from "./REPLFunction";


export const search: REPLFunction = async function search(
  args: Array<string>
): Promise<ReturnContents> {
  // TODO
  return new Promise<ReturnContents>((resolve, reject) => {
    // error if incorrect number of arguments
    if (!(args.length === 2 || args.length === 4)) {
      resolve({
        contents: [["Invalid number of arguments!"]],
        table: false,
        ariaLabel: "search",
        ariaDescr: "Error: invalid number of arguments"
      });
    }
    // query word, header true false, column type (index or name) COLUMN_INDEX or COLUMN_NAME, column to search (index or name)
    // store the queryWord and headertf as constants
    const queryWord = args[0];
    const headertf = args[1];
    // if there are two arguments
    if (args.length === 2) {
      // query the API
      fetch(
        "http://localhost:3232/searchcsv?searchfor=" +
          queryWord +
          "&headertf=" +
          headertf
      )
        // retrieve the JSON of the response
        .then((response) => response.json())
        .then((json) => {
          // if the result takes the right shape - if there is no error in the API query
          if (isSearchResult(json)) {
            // if the API call returns a table
            if ("data" in json) {
              // build and return the table
              resolve({
                contents: json.data,
                table: true,
                ariaLabel: "search",
                ariaDescr: "Search performed",
              });
            }
            // if the search does not error but cannot find the query
            if ("message" in json) {
              // return the message
              resolve({
                contents: [[json.message]],
                table: false,
                ariaLabel: "search",
                ariaDescr: json.message,
              });
            }
            // if the API call raises an error, return the error
            if ("error_message" in json) {
              resolve({
                contents: [[json.error_message]],
                table: false,
                ariaLabel: "search",
                ariaDescr: "Error: " + json.error_message
              });
            }
          }
        });
    }
    // if there are four arguments
    if (args.length === 4) {
      // store the colType and colName as constants
      const colType = args[2];
      const colName = args[3];
      // query the API
      fetch(
        "http://localhost:3232/searchcsv?searchfor=" +
          queryWord +
          "&headertf=" +
          headertf +
          "&coltype=" +
          colType +
          "&colname=" +
          colName
      )
        // retrieve the JSON of the response
        .then((response) => response.json())
        .then((json) => {
          // if the result takes the right shape - if there is no error in the API query
          if (isSearchResult(json)) {
            // if the API call returns a table
            if ("data" in json) {
              // build and return the table
              resolve({
                contents: json.data,
                table: true,
                ariaLabel: "search",
                ariaDescr: "Search performed"
              });
            }
            // if the search does not error but cannot find the query
            if ("message" in json) {
              // return the message
              resolve({
                contents: [[json.message]],
                table: false,
                ariaLabel: "search",
                ariaDescr: json.message
              });
            }
            // if the API call raises an error, return the error
            if ("error_message" in json) {
              resolve({
                contents: [[json.error_message]],
                table: false,
                ariaLabel: "search",
                ariaDescr: "Error: " + json.error_message,
              });
            }
          }
        });
    }
  });
};

// interface for a proper search API call
interface SearchResult {
  result: string;
  data: string[][];
  error_message: string;
  message: string;
}

// narrowing functionality for this class
function isSearchResult(data: any): data is SearchResult {
  if (!("result" in data)) {
    return false;
  }
  if (!("data" in data || "error_message" in data || "message" in data)) {
    return false;
  }
  return true;
}

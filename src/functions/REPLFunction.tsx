/**
 * All valid commands must implement
 * API call takes String[] argument(s) and returns a Promise
 */
export interface REPLFunction {
  (args: Array<string>): Promise<ReturnContents>;
}

export interface ReturnContents {
  contents: Array<Array<string>>;
  table: boolean;
  ariaLabel: string;
  ariaDescr: string;
}

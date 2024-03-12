import { SEARCH_CHANGE } from "./index";
export function doSearchChange(newSearchValue) {
  return {
    type: SEARCH_CHANGE,
    newSearchValue,
  };
}

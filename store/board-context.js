import { createContext } from "react";

const boardContext = createContext({
  activeToolItem: "",
  toolActionType: "",
  elements: [],
  indexed: 0,
  Bhistory: [[]],
  boardMouseDownHandler: () => {},
  handleToolItemClick: () => {},
  boardMouseMoveHandler: () => {},
  boardMouseUpHandler: () => {},
});

export default boardContext;

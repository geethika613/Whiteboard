import React, { useReducer } from "react";
import toolboxContext from "./ToolBox-context";
import { COLORS, TOOL_ITEMS, TOOLBOX_ACTIONS } from "../constants";

function toolboxReducer(state, action) {
  switch (action.type) {
    case TOOLBOX_ACTIONS.CHANGE_STROKE: {
      return {
        ...state,
        [action.payload.tool]: {
          ...state[action.payload.tool],
          stroke: action.payload.stroke,
        },
      };
    }

    case TOOLBOX_ACTIONS.CHANGE_FILL: {
      return {
        ...state,
        [action.payload.tool]: {
          ...state[action.payload.tool],
          fill: action.payload.fill,
        },
      };
    }
    case TOOLBOX_ACTIONS.CHANGE_SIZE: {
      const newState = { ...state };
      newState[action.payload.tool].size = action.payload.size;
      return newState;
    }

    default:
      return state;
  }
}

const initialToolboxState = {
  [TOOL_ITEMS.BRUSHTOOL]: {
    stroke: COLORS.BLACK,
  },

  [TOOL_ITEMS.LINETOOL]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.RECTANGLETOOL]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.CIRCLETOOL]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.ARROWTOOL]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.TEXT]: {
    stroke: COLORS.BLACK,
    size: 32,
  },
};

const ToolBoxprovider = ({ children }) => {
  const [toolboxState, dispatchToolboxAction] = useReducer(
    toolboxReducer,
    initialToolboxState
  );

  const changeStrokeHandler = (tool, stroke) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_STROKE,
      payload: {
        tool,
        stroke,
      },
    });
  };

  const changeFillHandler = (tool, fill) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_FILL,
      payload: {
        tool,
        fill,
      },
    });
  };
  const changeSizeHandler = (tool, size) => {
    dispatchToolboxAction({
      type: TOOLBOX_ACTIONS.CHANGE_SIZE,
      payload: {
        tool,
        size,
      },
    });
  };

  const toolboxContextValue = {
    toolboxState,
    changeStroke: changeStrokeHandler,
    changeFill: changeFillHandler,
    changeSize: changeSizeHandler,
  };

  return (
    <toolboxContext.Provider value={toolboxContextValue}>
      {children}
    </toolboxContext.Provider>
  );
};

export default ToolBoxprovider;

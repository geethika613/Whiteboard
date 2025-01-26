import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import rough from "roughjs";
import boardContext from "../../store/board-context";
import toolboxContext from "../../store/ToolBox-context";
import { TOOL_ACTION_TYPES, TOOL_ITEMS } from "../../constants";
import classes from "./index.module.css";

function Board() {
  const canvasRef = useRef();
  const textArearef = useRef();
  const {
    elements,
    toolActionType,
    boardMouseDownHandler,
    boardMouseMoveHandler,
    boardMouseUpHandler,
    textAreaBlurHandler,
    undo,
    redo,
  } = useContext(boardContext);
  const { toolboxState } = useContext(toolboxContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.ctrlKey && event.key === "z") {
        undo();
      } else if (event.ctrlKey && event.key === "y") {
        redo();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.save();

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      switch (element.type) {
        case TOOL_ITEMS.LINETOOL:
        case TOOL_ITEMS.RECTANGLETOOL:
        case TOOL_ITEMS.CIRCLETOOL:
        case TOOL_ITEMS.ARROWTOOL:
          roughCanvas.draw(element.roughEle);
          break;
        case TOOL_ITEMS.BRUSHTOOL:
          context.fillStyle = element.stroke;
          context.fill(element.path);
          context.restore();
          break;
        case TOOL_ITEMS.TEXT:
          context.textBaseline = "top";
          context.font = `${element.size}px Caveat`;
          context.fillStyle = element.stroke;
          context.fillText(element.text, element.x1, element.y1);
          context.restore();
          break;
        default:
          throw new Error("Type not recognised");
      }
    });

    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [elements]);

  useEffect(() => {
    const textarea = textArearef.current;
    if (toolActionType === TOOL_ACTION_TYPES.WRITING) {
      setTimeout(() => {
        textarea.focus();
      }, 0);
    }
  }, [toolActionType]);

  const handleBoardMouseDown = (event) => {
    boardMouseDownHandler(event, toolboxState);
  };

  const handleBoardMouseMove = (event) => {
    boardMouseMoveHandler(event);
  };

  const handleBoardUpMove = (event) => {
    boardMouseUpHandler();
  };

  return (
    <>
      {toolActionType === TOOL_ACTION_TYPES.WRITING && (
        <textarea
          type="text"
          ref={textArearef}
          className={classes.textElementBox}
          style={{
            top: elements[elements.length - 1].y1,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1]?.size}px`,
            color: elements[elements.length - 1]?.stroke,
          }}
          onBlur={(event) =>
            textAreaBlurHandler(event.target.value, toolboxState)
          }
        />
      )}
      <canvas
        ref={canvasRef}
        onMouseDown={handleBoardMouseDown}
        onMouseMove={handleBoardMouseMove}
        onMouseUp={handleBoardUpMove}
      />
    </>
  );
}

export default Board;

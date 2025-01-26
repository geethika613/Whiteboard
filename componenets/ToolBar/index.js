import React, { useContext } from "react";
import { LuRectangleHorizontal } from "react-icons/lu"; // Lucide icon
import {
  FaSlash,
  FaRegCircle,
  FaEraser,
  FaArrowRight,
  FaDownload,
  FaFont,
  FaPaintBrush,
  FaUndoAlt,
  FaRedoAlt,
} from "react-icons/fa";
import classes from "./index.module.css";
import cx from "classnames";
import boardContext from "../../store/board-context";
import { TOOL_ITEMS } from "../../constants";

const Toolbar = () => {
  const { activeToolItem, handleToolItemClick, undo, redo } =
    useContext(boardContext);

  const handleDownloadClick = () => {
    const downloadCanvas = (canvas) => {
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `whiteboard-${timestamp}.png`;

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    try {
      const canvas = document.querySelector("canvas");
      if (!canvas) throw new Error("Canvas not found");

      // For drawings that need a white background
      if (canvas.style.background !== "white") {
        const tempCanvas = document.createElement("canvas");
        const ctx = tempCanvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");

        // Copy dimensions
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;

        // Add white background and draw original content
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        ctx.drawImage(canvas, 0, 0);

        downloadCanvas(tempCanvas);
      } else {
        downloadCanvas(canvas);
      }
    } catch (error) {
      console.error("Download failed:", error.message);
    }
  };

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.BRUSHTOOL,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.BRUSHTOOL)}
      >
        <FaPaintBrush />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.LINETOOL,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.LINETOOL)}
      >
        <FaSlash />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.RECTANGLETOOL,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.RECTANGLETOOL)}
      >
        <LuRectangleHorizontal />
      </div>

      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.CIRCLETOOL,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.CIRCLETOOL)}
      >
        <FaRegCircle />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "ARROWTOOL",
        })}
        onClick={() => handleToolItemClick("ARROWTOOL")}
      >
        <FaArrowRight />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === "FONTTOOL",
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.TEXT)}
      >
        <FaFont />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ERASER,
        })}
        onClick={() => handleToolItemClick(TOOL_ITEMS.ERASER)}
      >
        <FaEraser />
      </div>
      <div className={classes.toolItem} onClick={undo}>
        <FaUndoAlt />
      </div>
      <div className={classes.toolItem} onClick={redo}>
        <FaRedoAlt />
      </div>
      <div className={classes.toolItem} onClick={handleDownloadClick}>
        <FaDownload />
      </div>
    </div>
  );
};

export default Toolbar;

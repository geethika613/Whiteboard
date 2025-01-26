import { ELEMENT_ERASE_THRESHOLD } from "../constants";
export const isPointCloseToLine = (x1, y1, x2, y2, pointX, pointY) => {
  const distToStart = distanceBetweenPoints(x1, y1, pointX, pointY);
  const distToEnd = distanceBetweenPoints(x2, y2, pointX, pointY);
  const distLine = distanceBetweenPoints(x1, y1, x2, y2);

  return Math.abs(distToStart + distToEnd - distLine) < ELEMENT_ERASE_THRESHOLD;
};

// Function to check if a point is near another point
export const isNearPoint = (x, y, x1, y1) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5;
};

// Function to calculate the arrowhead coordinates
export const getArrowHeadCoordinates = (x1, y1, x2, y2, arrowLength) => {
  const angle = Math.atan2(y2 - y1, x2 - x1);

  const x3 = x2 - arrowLength * Math.cos(angle - Math.PI / 6);
  const y3 = y2 - arrowLength * Math.sin(angle - Math.PI / 6);

  const x4 = x2 - arrowLength * Math.cos(angle + Math.PI / 6);
  const y4 = y2 - arrowLength * Math.sin(angle + Math.PI / 6);

  return { x3, y3, x4, y4 };
};

// Function to calculate the midpoint between two points
export const midPointerBtw = (p1, p2) => {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
};

// Utility function to calculate the distance between two points
const distanceBetweenPoints = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

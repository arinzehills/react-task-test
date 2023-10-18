import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define a draggable row component
export const DraggableRow = ({ index, moveRow, children }) => {
  const [, ref] = useDrag({
    type: "ROW",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "ROW",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveRow(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return <div ref={(node) => ref(drop(node))}>{children}</div>;
};

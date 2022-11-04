import React from "react";
import { useDrag } from "react-dnd";
import { Kind } from "shogi.js/dist/src/Kind";

import { Color, Place } from "./types";

export type PieceProps = {
  color: Color;
  kind: Kind;
  place: Place | undefined;
  reversed: boolean;
};

export type PieceDragObject = {
  type: "piece";
  color: Color;
  kind: Kind;
  from: Place | undefined;
};

export const Piece: React.FC<PieceProps> = ({ place, color, kind, reversed }) => {
  const item: PieceDragObject = {
    type: "piece",
    color, // Don't use orientation here
    kind,
    from: place,
  };

  const [{ isDragging }, drag] = useDrag({
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const orientation = !reversed ? color : ((1 - color) as Color);
  const imageURL = `/images/shogi-pieces/${orientation}${kind}.svg`;

  return (
    <img
      ref={drag}
      className="piece"
      src={imageURL}
      alt={kind}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    />
  );
};

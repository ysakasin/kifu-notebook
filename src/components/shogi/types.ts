import { Color } from "shogi.js";
import { Kind } from "shogi.js/dist/src/Kind";

export { Color };

export type Place = {
  x: number;
  y: number;
};

export type MovePiece = {
  color: Color;
  kind: Kind;
  from: Place;
  to: Place;
};

export type DropPiece = {
  color: Color;
  kind: Kind;
  from: undefined;
  to: Place;
};

export type Move = MovePiece | DropPiece;

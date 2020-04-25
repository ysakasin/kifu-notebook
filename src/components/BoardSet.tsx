import * as React from "react";
import { Component } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import { IStateFormat, IMoveMoveFormat } from "json-kifu-format/dist/src/Formats";
import { Board } from "./shogi/Board";
import { Hand } from "./shogi/Hand";
import { KifuTree, KifuTreeNode } from "../models";
import "./BoardSet.css";

export interface BoardSetStateProps {
  shogiState: IStateFormat;
  kifuTree: KifuTree;
  reversed: boolean;
  currentNode: KifuTreeNode;
}

export interface BoardSetDispatchProps {
  onInputMove: (move: IMoveMoveFormat) => void;
  onChangeReversed: (reversed: boolean) => void;
}

class BoardSet extends Component<BoardSetStateProps & BoardSetDispatchProps, {}> {
  render() {
    const { shogiState, kifuTree, reversed } = this.props;
    const currentNode = kifuTree.getCurrentNode();
    const players = [
      "☗" + (kifuTree.baseJKF.header["先手"] || kifuTree.baseJKF.header["下手"] || "先手"),
      "☖" + (kifuTree.baseJKF.header["後手"] || kifuTree.baseJKF.header["上手"] || "後手"),
    ];

    return (
      <DndProvider backend={HTML5Backend}>
        <div>
          <div className="boardSet">
            <div className="players left">
              <Hand
                color={reversed ? 0 : 1}
                pieceCounts={shogiState.hands[reversed ? 0 : 1]}
                playerName={players[reversed ? 0 : 1]}
                onInputMove={(e) => this.props.onInputMove(e)}
                reversed={reversed}
              />
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={reversed}
                    onChange={(e) => this.props.onChangeReversed(e.target.checked)}
                  />
                  盤面反転
                </label>
              </div>
            </div>
            <div className="board">
              <Board
                board={shogiState.board}
                lastMovedPlace={currentNode.move?.to}
                onInputMove={(e) => this.props.onInputMove(e)}
                reversed={reversed}
              />
            </div>
            <div className="players right">
              <Hand
                color={reversed ? 1 : 0}
                pieceCounts={shogiState.hands[reversed ? 1 : 0]}
                playerName={players[reversed ? 1 : 0]}
                onInputMove={(e) => this.props.onInputMove(e)}
                reversed={reversed}
              />
            </div>
          </div>
        </div>
      </DndProvider>
    );
  }
}

export default BoardSet;

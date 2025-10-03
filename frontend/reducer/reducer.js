import { Status } from "../constants";
import { resetBoard } from "../constants";
import actionTypes from "./actionTypes";

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.NEW_MOVE: {
            let { position, currentPositionIndex, currentMoveIndex, movesList, moveNum, turn, castleDirection, castleDirectionHistory } = state
            position = [
                ...position,
                action.payload.newPosition
            ]
            currentPositionIndex += 1;
            currentMoveIndex += 1;
            movesList = [
                ...movesList,
                action.payload.newMove
            ]
            turn = turn === 'w' ? 'b' : 'w'
            moveNum = turn === 'w' ? moveNum + 1 : moveNum;
            castleDirectionHistory = [
                ...castleDirectionHistory,
                { ...castleDirection }  // deep enough for this structure
            ]

            return {
                ...state,
                position,
                currentPositionIndex,
                currentMoveIndex,
                movesList,
                turn,
                moveNum,
                castleDirectionHistory,
            }
        }

        case actionTypes.GENERATE_CANDIDATE_MOVES: {
            const { candidateMoves } = action.payload
            return {
                ...state,
                candidateMoves
            }
        }

        case actionTypes.CLEAR_CANDIDATE_MOVES: {
            return {
                ...state,
                candidateMoves: []
            }
        }

        case actionTypes.PROMOTION_OPEN: {
            return {
                ...state,
                status: Status.promoting,
                promotionSquare: { ...action.payload },
            }
        }

        case actionTypes.PROMOTION_CLOSE: {
            return {
                ...state,
                status: Status.ongoing,
                promotionSquare: null,
            }
        }

        case actionTypes.CAN_CASTLE: {
            let { turn, castleDirection } = state

            const newCastleDirection = {
                ...castleDirection,
                [turn]: action.payload
            }

            return {
                ...state,
                castleDirection: newCastleDirection,
            }
        }

        case actionTypes.STALEMATE: {
            return {
                ...state,
                status: Status.stalemate
            }
        }

        case actionTypes.INSUFFICIENT_MATERIAL: {
            return {
                ...state,
                status: Status.insufficient
            }
        }

        case actionTypes.WIN: {
            return {
                ...state,
                status: action.payload === 'w' ? Status.white : Status.black
            }
        }

        case actionTypes.NEW_GAME: {
            return {
                ...action.payload,
            }
        }

        case actionTypes.FIRST_MOVE: {
            let { currentPositionIndex } = state;
            currentPositionIndex = 0;
            return {
                ...state,
                currentPositionIndex,
                candidateMove: [],
            };
        }

        case actionTypes.PREVIOUS_MOVE: {
            let { currentPositionIndex } = state;
            if (currentPositionIndex > 0) {
                currentPositionIndex -= 1;
            }
            return {
                ...state,
                currentPositionIndex,
                candidateMove: [],
            };
        }

        case actionTypes.NEXT_MOVE: {
            let { position, currentPositionIndex } = state;
            if (currentPositionIndex >= 0 && currentPositionIndex < (position.length - 1)) {
                currentPositionIndex += 1;
            }
            return {
                ...state,
                currentPositionIndex,
                candidateMove: [],
            };
        }

        case actionTypes.CURRENT_MOVE: {
            let { position, currentPositionIndex } = state;
            currentPositionIndex = position.length - 1;
            return {
                ...state,
                currentPositionIndex,
                candidateMove: [],
            };
        }

        case actionTypes.INCREMENT_STRIKES: {
            let { status, strikeCount } = state;
            strikeCount++;
            if (strikeCount >= 3) {
                status = Status.threeStrikes;
            }
            return {
                ...state,
                status: status,
                strikeCount: strikeCount
            }
        }

        case actionTypes.LOGIN: {
            return {
                ...state,
                user: {
                    username: action.payload.username,
                    password: action.payload.password,
                },
            };
        }

        case actionTypes.LOGOUT: {
            return {
                ...action.payload,
            }
        }

        case actionTypes.SET_LINES: {
            return {
                ...state,
                userLines: action.payload
            }
        }

        case actionTypes.TOGGLE_SELECTED_LINE_IDX: {
            let { selectedLinesIdxs = [] } = state;
            const idx = action.payload;
            const isSelected = selectedLinesIdxs.includes(idx);
            return {
                ...state,
                selectedLinesIdxs: isSelected
                    ? selectedLinesIdxs.filter(i => i !== idx) // remove idx
                    : [...selectedLinesIdxs, idx],            // add idx
            };
        }

        case actionTypes.SET_SELECTED_LINES: {
            let { userLines, selectedLinesIdxs, currentName, currentLine, currentIdx, currentColor, currentVariation, variationIdx } = state;

            let newSelectedLines = [];
            selectedLinesIdxs.forEach((idx) => {
                newSelectedLines.push(userLines[idx]);
            });
            console.log("in reducer newSelectedLines:", newSelectedLines);

            currentIdx = 0;
            currentLine = newSelectedLines[currentIdx].ParsedPGN;
            currentColor = newSelectedLines[currentIdx].Color === "White" ? "White" : "Black";
            currentName = newSelectedLines[currentIdx].Name;
            variationIdx = 0;
            currentVariation = currentLine[variationIdx];

            return {
                ...state,
                ...resetBoard(currentColor, currentVariation[0].white),
                status: Status.ongoing,
                selectedLines: newSelectedLines,
                currentName: currentName,
                currentLine: currentLine,
                currentIdx: currentIdx,
                currentColor: currentColor,
                currentVariation: currentVariation,
                variationIdx: variationIdx
            }
        }

        case actionTypes.INCREMENT_SELECTED_IDX: {
            console.log("incrementing selected idx");
            let { status, selectedLines, selectedIdx, currentName, currentLine, currentColor, currentVariation } = state;

            console.log("incrementSelectedIdx, selectedIdx:", selectedIdx, "selectedLines.length - 1", selectedLines.length - 1);
            if (selectedIdx < selectedLines.length - 1) {
                selectedIdx++;
                currentColor = selectedLines[selectedIdx].Color;
                currentLine = selectedLines[selectedIdx].ParsedPGN;
                currentName = selectedLines[selectedIdx].Name;
                currentVariation = currentLine[0]; // start the new line
                status = Status.ongoing;
            } else {
                status = Status.drillEnds;
            }


            return {
                ...state,
                ...resetBoard(currentColor, currentVariation[0].white),
                status: status,
                selectedIdx: selectedIdx,
                currentName: currentName,
                currentColor: currentColor,
                currentLine: currentLine,
                currentIdx: 0,
                currentVariation: currentVariation,
                variationIdx: 0
            }
        }

        case actionTypes.INCREMENT_LINE_IDX: {
            console.log("incrementing line idx");
            let { status, currentColor, currentLine, currentIdx, currentVariation } = state;

            console.log("incrementLineIdx, currentIdx:", currentIdx, "currentLine.length - 1:", currentLine.lenght - 1);
            if (currentIdx < currentLine.length - 1) {
                currentIdx++;
                currentVariation = currentLine[currentIdx];
                status = Status.ongoing;
            } else {
                status = Status.lineEnds;
            }

            return {
                ...state,
                ...resetBoard(currentColor, currentVariation[0].white),
                status: status,
                currentIdx: currentIdx,
                currentVariation: currentVariation,
                variationIdx: 0
            }
        }

        case actionTypes.INCREMENT_VARIATION_IDX: {
            console.log("incrementing variation idx");
            let { status, currentVariation, variationIdx } = state;

            console.log("incrementVariationIdx, variationIdx:", variationIdx, "currentVariation.length - 1", currentVariation.length - 1);
            if (variationIdx < currentVariation.length - 1) {
                variationIdx++;
            } else {
                status = Status.variationEnds;
            }

            return {
                ...state,
                status: status,
                variationIdx: variationIdx
            };
        }

        case actionTypes.DRILL_POPUP_CLOSE: {
            return {
                ...action.payload,
                user: {
                    username: action.payload.username,
                    password: action.payload.password,
                },
            }
        }

        case actionTypes.LINE_POPUP_CLOSE: {
            let { status, selectedLines, selectedIdx } = state;

            if (selectedIdx < selectedLines.length) {
                status = Status.ongoing;
            } else {
                status = Status.drillEnds;
            }

            console.log("linePopupClose, changing status to:", status);

            return {
                ...state,
                status: status
            }
        }

        case actionTypes.VARIATION_POPUP_CLOSE: {
            let { status, selectedLines, selectedIdx, currentLine, currentIdx } = state;

            if (currentIdx < currentLine.length) {
                status = Status.ongoing;
            } else if (selectedIdx < selectedLines.length - 1) {
                status = Status.lineEnds;
            } else {
                status = Status.drillEnds;
            }

            console.log("variationPopupClose, changing status to:", status);

            return {
                ...state,
                status: status
            }
        }

        case actionTypes.FLIP_BOARD: {
            let { isFlipped } = state;
            return {
                ...state,
                isFlipped: !isFlipped
            }
        }


        default:
            return state
    }
};

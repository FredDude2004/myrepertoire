import { Status } from "../constants";
import actionTypes from "./actionTypes";

export const reducer = (state, action) => {
    console.log("Reducer received:", action.type, "with payload", action.payload);

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
            let { strikeCount } = state;
            strikeCount++;
            return {
                ...state,
                strikeCount,
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
            const idx = action.payload;
            const isSelected = state.selectedLinesIdxs.includes(idx);
            return {
                ...state,
                selectedLinesIdxs: isSelected
                    ? state.selectedLinesIdxs.filter(i => i !== idx) // remove idx
                    : [...state.selectedLinesIdxs, idx],            // add idx
            };
        }

        case actionTypes.SET_SELECTED_LINES: {
            let { userLines, selectedLinesIdxs, lastSelectedIdx, currentLine, currentIdx, currentColor, currentVariation, variationIdx } = state;
            let newSelectedLines = [];
            selectedLinesIdxs.forEach((idx) => {
                newSelectedLines.push(userLines[idx]);
            });
            lastSelectedIdx = newSelectedLines.length - 1;
            currentLine = newSelectedLines[currentIdx].ParsedPGN;
            currentColor = newSelectedLines[currentIdx].Color === "White" ? "White" : "Black";
            variationIdx = 0;
            currentVariation = currentLine[variationIdx];

            return {
                ...state,
                selectedLines: newSelectedLines,
                lastSelectedIdx: lastSelectedIdx,
                currentLine: currentLine,
                currentColor: currentColor,
                currentVariation: currentVariation,
                variationIdx: variationIdx
            }

        }

        case actionTypes.INCREMENT_SELECTED_IDX: {
            let { status, selectedLines, selectedIdx, currentLine, currentIdx, currentColor, currentVariation, variationIdx } = state;

            if (selectedIdx >= selectedLines.length - 1) {
                status = Status.drillEnds;
                console.log("Changing status to Status.drillEnds");
            } else {
                selectedIdx++;
                currentLine = selectedLines[selectedIdx].ParsedPGN;
                currentColor = selectedLines[selectedIdx].Color;
                currentIdx = 0;
                currentVariation = currentLine[currentIdx];
                variationIdx = 0;
            }

            return {
                ...state,
                ...action.payload,
                status: status,
                selectedIdx: selectedIdx,
                currentLine: currentLine,
                currentColor: currentColor,
                currentVariation: currentVariation,
                variationIdx: variationIdx
            }
        }

        case actionTypes.INCREMENT_LINE_IDX: {
            let { status, currentLine, currentIdx, currentVariation, variationIdx } = state;

            if (currentIdx >= currentLine.length - 1) {
                status = Status.lineEnds;
                console.log("Changing status to Status.lineEnds");
            } else {
                currentIdx++;
                variationIdx = 0;
                currentVariation = currentLine[currentIdx];
            }

            return {
                ...state,
                ...action.payload,
                status: status,
                currentIdx: currentIdx,
                currentVariation: currentVariation,
                variationIdx, variationIdx
            }
        }

        case actionTypes.INCREMENT_VARIATION_IDX: {
            let { status, currentVariation, variationIdx } = state;

            if (variationIdx >= currentVariation.length - 1) {
                status = Status.variationEnds;
                console.log("Changing status to Status.variationEnds");
            } else {
                variationIdx++;
            }

            console.log("status:", status);

            return {
                ...state,
                status,
                variationIdx,
            };
        }

        case actionTypes.VARIATION_ENDS: {
            return {
                ...state,
                status: Status.variationDone
            }
        }

        case actionTypes.LINE_ENDS: {
            return {
                ...state,
                status: Status.lineDone
            }
        }

        case actionTypes.DRILL_ENDS: {
            return {
                ...state,
                status: Status.drillDone
            }
        }

        default:
            return state
    }
};

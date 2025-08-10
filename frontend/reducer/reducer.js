import { Status } from "../constants";
import actionTypes from "./actionTypes";
import { resetBoard } from "../constants";


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
            let { userLines, selectedLinesIdxs, selectedLines, lastSelectedIdx, currentLine, currentColor } = state;
            selectedLinesIdxs.forEach((idx) => {
                selectedLines.push(userLines[idx]);
            });
            lastSelectedIdx = selectedLines.length - 1;
            currentLine = selectedLines[0].ParsedPGN;
            currentColor = selectedLines[0].Color === "White" ? "White" : "Black";

            console.log("In Reducer, currentLine:", currentLine);
            console.log("In Reducer, currentColor:", currentColor);

            return {
                ...state,
                selectedLines: selectedLines,
                lastSelectedIdx: lastSelectedIdx,
                currentLine: currentLine,
            }

        }

        case actionTypes.SET_CURRENT_LINE: {
            let { status, selectedLines, selectedIdx, lastSelectedIdx, currentLine, lastCurrentIdx, currentColor } = state;

            if (selectedIdx > lastSelectedIdx) {
                status = Status.drillEnds;
            } else {
                currentLine = selectedLines[selectedIdx].ParsedPGN;
                lastCurrentIdx = currentLine.length - 1;
                currentColor = selectedLines[selectedIdx].Color;
            }

            return {
                ...state,
                status: status,
                currentLine: currentLine,
                lastCurrentIdx: lastCurrentIdx,
                currentColor: currentColor
            }
        }

        case actionTypes.SET_CURRENT_VARIATION: {
            let { status, currentLine, currentIdx, lastCurrentIdx, currentVariation, variationIdx } = state;

            if (currentIdx > lastCurrentIdx) {
                status = Status.lineEnds;
            } else {
                currentVariation = currentLine[currentIdx];
                variationIdx = 0;
            }

            console.log("In SET_CURRENT_VARIATION, currentVariation:", currentVariation);

            return {
                ...state,
                status,
                currentVariation,
                variationIdx
            }
        }

        case actionTypes.INCREMENT_SELECTED_IDX: {
            let { status, currentSelectedIdx, selectedIdx, lastSelectedIdx } = state;

            if (currentSelectedIdx > lastSelectedIdx) {
                status = Status.drillEnds;
            } else {
                selectedIdx++;
                currentLine = selectedLines[selectedIdx].ParsedPGN;
                currentColor = selectedLines[selectedIdx].Color === "White" ? "White" : "Black";
            }

            return {
                ...state,
                status,
                selectedIdx,
                currentLine,
                currentColor
            }
        }

        case actionTypes.INCREMENT_LINE_IDX: {
            let { status, currentSelectedIdx, lastSelectedIdx } = state;

            if (currentSelectedIdx > lastSelectedIdx) {
                status = Status.drillEnds;
            } else {
                currentSelectedIdx++;
            }

            return {
                ...state,
                status,
                currentSelectedIdx
            }
        }

        case actionTypes.INCREMENT_VARIATION_IDX: {
            let { status, variationIdx, lastVariationIdx } = state;

            if (currentVariationIdx > lastVariationIdx) {
                status = Status.drillEnds;
            } else {
                variationIdx++;
            }

            return {
                ...state,
                status,
                variationIdx
            }
        }

        case actionTypes.NEXT_VARIATION: {
            let { status } = state;

            // reset game state
            const newBoard = resetBoard(action.payload);

            return {
                ...state,
                ...newBoard,
                status,
                variationIdx
            }
        }

        case actionTypes.NEXT_LINE: {
            let { status, selectedIdx, lastSelectedIdx } = state;

            // reset game state
            const newBoard = resetBoard(action.payload);

            // increment current line state
            if (selectedIdx === lastSelectedIdx) {
                status = Status.drillEnds
            } else {
                selectedIdx++;
            }

            return {
                ...state,
                ...newBoard,
                status,
                selectedIdx
            }
        }

        default:
            return state
    }
};

import { Status } from "../constants";
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

            console.log('made all updates');

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

        default:
            return state
    }
};

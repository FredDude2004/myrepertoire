import arbitor from "../arbiter/arbiter.js";

export const getCharacter = (file: number) => String.fromCharCode(file + 96);
export const getFileNumber = (char: string) => char.toLowerCase().charCodeAt(0) - 97;
export const createPosition = () => {
    const position = new Array(8).fill("").map(() => new Array(8).fill(""));

    for (let i = 0; i < 8; i++) {
        position[6][i] = "bp";
        position[1][i] = "wp";
    }

    position[0][0] = "wr";
    position[0][1] = "wn";
    position[0][2] = "wb";
    position[0][3] = "wq";
    position[0][4] = "wk";
    position[0][5] = "wb";
    position[0][6] = "wn";
    position[0][7] = "wr";

    position[7][0] = "br";
    position[7][1] = "bn";
    position[7][2] = "bb";
    position[7][3] = "bq";
    position[7][4] = "bk";
    position[7][5] = "bb";
    position[7][6] = "bn";
    position[7][7] = "br";

    return position;
};

export const copyPosition = (position: string[][]) => {
    const newPosition = new Array(8).fill("").map(() => new Array(8).fill(""));

    for (let rank = 0; rank < position.length; rank++) {
        for (let file = 0; file < position[0].length; file++) {
            newPosition[rank][file] = position[rank][file];
        }
    }

    return newPosition;
};

type Coord = {
    x: number;
    y: number;
}

export const areSameColorTiles = (coords1: Coord, coords2: Coord) =>
    (coords1.x + coords1.y) % 2 === coords2.x + coords2.y;

export const findPieceCoords = (position: string[][], type: string) => {
    let results: Coord[] = [];
    position.forEach((rank, i) => {
        rank.forEach((pos, j) => {
            if (pos === type) results.push({ x: i, y: j });
        });
    });
    return results;
};

interface MoveNotationArgs {
    piece: string;
    rank: number;
    file: number;
    x: number;
    y: number;
    position: string[][];
    previousPosition: string[][];
    promotesTo?: string;
}

export const getNewMoveNotation = ({
    piece,
    rank,
    file,
    x,
    y,
    position,
    previousPosition,
    promotesTo,
}: MoveNotationArgs) => {
    let note = "";
    const takes = position[x][y];

    rank = Number(rank);
    file = Number(file);
    if (piece[1] === "k" && Math.abs(file - y) === 2) {
        if (file < y) return "O-O";
        else return "O-O-O";
    }

    if (piece[1] !== "p") {
        note += disambiguateMove(piece, position, previousPosition, rank, file, x, y, note, takes,);
    } else if (rank !== x && file !== y) {
        note += getCharacter(file + 1) + "x";
    }

    note += getCharacter(y + 1) + (x + 1);
    const positionAfterMove = arbitor.performMove({
        position,
        piece,
        rank,
        file,
        x,
        y,
    });

    if (promotesTo) note += "=" + promotesTo.toUpperCase();

    const mated = arbitor.isCheckMate(
        positionAfterMove,
        piece[0] === "w" ? "b" : "w",
        "none",
    );
    const checked = arbitor.isPlayerInCheck({
        positionAfterMove: positionAfterMove,
        position: position,
        player: piece[0] === "w" ? "b" : "w",
    });

    if (mated) note += "#";
    else if (checked) note += "+";

    return note;
};

export const disambiguateMove = (
    piece: string,
    position: string[][],
    previousPosition: string[][],
    currX: number,
    currY: number,
    toX: number,
    toY: number,
    note: string,
    takes: string) => {
    let ambiguousPieces = [];
    const enemyColor = piece[0] === "w" ? "b" : "w";

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            if (position[rank][file] === "" || (rank === currX && file === currY) || position[rank][file][0] === enemyColor) {
                continue;
            } else if (position[rank][file] === piece) {
                const pieceAtPositionValidMoves = arbitor.getValidMoves({
                    position: position,
                    prevPosition: previousPosition,
                    castleDirection: "none",
                    piece: position[rank][file],
                    rank,
                    file,
                });
                if (
                    pieceAtPositionValidMoves.some(([x, y]) => x === toX && y === toY)
                ) {
                    ambiguousPieces.push({
                        pieceAt: position[rank][file],
                        rank: rank,
                        file: file,
                    });
                }
            }
        }
    }

    const pieceLetter = piece[1].toUpperCase();
    const fileChar = getCharacter(currY + 1);
    const rankChar = (currX + 1).toString();

    function appendTake(str: string) {
        return takes !== "" ? str + "x" : str;
    }

    if (ambiguousPieces.length === 0) {
        // No ambiguity, just return the piece letter
        note += appendTake(pieceLetter);
    } else if (ambiguousPieces.length === 1) {
        // Only one ambiguous piece
        if (ambiguousPieces[0].file !== currY) {
            // try to disambiguate by file
            note += appendTake(pieceLetter + fileChar);
        } else {
            // disambiguate by rank
            note += appendTake(pieceLetter + rankChar);
        }
    } else {
        // More than one ambiguous piece
        let onFile = false;
        let onRank = false;
        ambiguousPieces.forEach((ambiguousPiece) => {
            // Check if the moving piece is on the same file or rank of an ambiguous piece
            if (ambiguousPiece.file === currY) onFile = true;
            if (ambiguousPiece.rank === currX) onRank = true;
        });

        if (onFile && onRank) {
            // Disambiguate depending on both file and rank
            note += appendTake(pieceLetter + fileChar + rankChar);
        } else if (onFile) {
            note += appendTake(pieceLetter + rankChar);
        } else {
            note += appendTake(pieceLetter + fileChar);
        }
    }

    return note;
};

export const getPositionFromNotation = (
    position: string[][],
    previousPosition: string[][],
    notation: string,
    castleDirection: string,
    color: string) => {

    if (notation === null) {
        return;
    }


    const enemyColor = color === "w" ? "b" : "w";
    let piece = "";
    let toX = 0;
    let toY = 0;
    if (notation.includes("K")) {
        piece = color + "k";
    } else if (notation === "O-O-O") {
        piece = color + "k";
        toX = enemyColor === "w" ? 7 : 0;
        toY = 2;
    } else if (notation === "O-O") {
        piece = color + "k";
        toX = enemyColor === "w" ? 7 : 0;
        toY = 6;
    }

    else if (notation.includes("=")) piece = color + "p";
    else if (notation.includes("Q")) piece = color + "q";
    else if (notation.includes("R")) piece = color + "r";
    else if (notation.includes("B")) piece = color + "b";
    else if (notation.includes("N")) piece = color + "n";
    else piece = color + "p";

    let trimmedNotation = notation;
    if (notation.includes("+") || notation.includes("#")) {
        trimmedNotation = trimmedNotation.slice(0, -1);
    }

    if (toX === 0 && toY === 0) {
        toX = parseInt(trimmedNotation.charAt(trimmedNotation.length - 1)) - 1;
        toY = getFileNumber(trimmedNotation.charAt(trimmedNotation.length - 2));
    }

    let originalX = 0;
    let originalY = 0;

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            if (position[rank][file] === "" || position[rank][file][0] === enemyColor) {
                continue;
            } else if (position[rank][file] === piece) {
                const pieceAtPositionValidMoves = arbitor.getValidMoves({
                    position: position,
                    prevPosition: previousPosition,
                    castleDirection: castleDirection,
                    piece: piece,
                    rank: rank,
                    file: file,
                });
                if (pieceAtPositionValidMoves.some(([x, y]) => x === toX && y === toY)) {
                    originalX = rank;
                    originalY = file;
                }
            }
        }
    }

    return { piece: piece, rank: originalX, file: originalY, x: toX, y: toY };
}

export type QuizLine = {
    moveNumber: number;
    white: string;
    black: string;
}[];

export function isMoveCorrect(
    userMove: string,
    moveNum: number,
    color: string,
    openingLine: QuizLine): boolean {
    // Check if the moveNumber is valid for the openingLine
    if (moveNum < 1 || moveNum > openingLine.length) {
        return false;
    }

    const correctMove = openingLine[moveNum - 1][color === 'w' ? 'white' : 'black'];
    return userMove === correctMove;
}

export function getOpponentMove(
    moveNum: number,
    color: string,
    openingLine: QuizLine): string {
    if (moveNum < 1 || moveNum > openingLine.length) {
        return "";
    }

    return openingLine[moveNum - 1][color === 'w' ? 'black' : 'white'];
}

export function getFirstWhiteMove(notation: string) {
    let piece = "";

    if (notation.includes("N")) piece = "wn";
    else piece = "wp";

    const toX = parseInt(notation.charAt(notation.length - 1)) - 1;
    const toY = getFileNumber(notation[notation.length - 2]);

    let originalX = 0;
    let originalY = 0;

    if (piece === "wp") {
        originalX += 2;
        originalY += toY;
    } else if ((toX === 2 && toY === 0) || (toX === 2 && toY === 2)) {
        originalX = 0;
        originalY = 1;
    } else {
        originalX = 0;
        originalY = 6;
    }

    return { piece: piece, rank: originalX, file: originalY, x: toX, y: toY };
}

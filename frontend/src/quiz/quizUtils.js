const sampleQuiz = [
    {
        moveNumber: 1,
        white: "e4",
        black: "e5",
    },
    {
        moveNumber: 2,
        white: "Nf3",
        black: "Nc6",
    },
    {
        moveNumber: 3,
        white: "Bb5",
        black: "a6",
    },
    {
        moveNumber: 4,
        white: "Ba4",
        black: "Nf6",
    },
]

export function isMoveCorrect(userMove, moveNum, color) {
    const correctMove = sampleQuiz[moveNum - 1][color === 'w' ? 'white' : 'black'];
    // console.log(`User Move: ${userMove}, Correct Move: ${correctMove}, Move Number: ${moveNum}`);
    return userMove === correctMove;
}






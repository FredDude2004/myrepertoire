package main

import (
	"fmt"
	"myrepertoire.io/backend/utils"
)

func main() {
	pgn1 := `
[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]
[Link "https://www.chess.com/analysis/game/pgn/4K2jdqroie/analysis"]

1. e4 e5 2. Nc3 Nf6 (2... Nc6 3. Bc4 Nf6 4. d3 Bb4 5. Ne2 O-O) 3. f4 d5 (3...
exf4 4. e5 Qe7 5. Qe2 Ng8 6. Nf3 Nc6 7. d4) 4. fxe5 Nxe4 5. Qf3 Nxc3 6. bxc3 c5
7. d4 *
    `

	result1, err := utils.ProcessPGN(pgn1)
	if err != nil {
		panic(err)
	}

	fmt.Println(result1)

}

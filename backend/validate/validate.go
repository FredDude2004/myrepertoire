package main

import (
	"fmt"
	"log"
	"os"

	"github.com/corentings/chess/v2"
	"myrepertoire.io/backend/lexer"
	"myrepertoire.io/backend/parser"
)

func main() {
	pgnStrWithVars, err := os.Open("../examples/04.txt")
	if err != nil {
		panic(err)
	}
	defer pgnStrWithVars.Close()

	scanner := chess.NewScanner(pgnStrWithVars, chess.WithExpandVariations())
	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			log.Fatal("Failed to parse game: %v", err)
		}

		lexed := lexer.TokenizePGN(gameToString(game))
		parsed := parser.ParseMoves(lexed)
		json := parser.ToJSON(parsed)
		fmt.Println(json)

		fmt.Println(game.GetTagPair("Site"))
	}
}

func gameToString(game *chess.Game) string {
	return fmt.Sprintf("%s", game)
}

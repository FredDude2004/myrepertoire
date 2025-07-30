package main

import (
	"fmt"
	"myrepertoire.io/backend/lexer"
	"myrepertoire.io/backend/parser"
	"os"
)

func main() {
	bytes, _ := os.ReadFile("./examples/02.txt")
	tokens := lexer.TokenizePGN(string(bytes))

	for _, token := range tokens {
		token.Debug()
	}

	parsed := parser.ParseMoves(tokens)
	json := parser.ToJSON(parsed)

	fmt.Println(json)
}

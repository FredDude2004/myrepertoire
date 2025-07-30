package main

import (
	"myrepertoire.io/backend/lexer"
	"os"
)

func main() {
	bytes, _ := os.ReadFile("./examples/00.txt")
	tokens := lexer.Tokenize(string(bytes))

	for _, token := range tokens {
		token.Debug()
	}

}

package utils

import (
	"myrepertoire.io/backend/api/utils/lexer"
	"myrepertoire.io/backend/api/utils/parser"
	"myrepertoire.io/backend/api/utils/validate"
)

func ProcessPGN(pgn string) (string, error) {
	err := validate.ValidatePGN(pgn)
	if err != nil {
		return "", err
	}

	lexed := lexer.TokenizePGN(pgn)
	parsed := parser.ParseMoves(lexed)
	json := parser.ToJSON(parsed)

	return json, nil
}

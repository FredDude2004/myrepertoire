package utils

import (
	"github.com/corentings/chess/v2"
	"myrepertoire.io/backend/api/utils/lexer"
	"myrepertoire.io/backend/api/utils/parser"
	"strings"
)

func ProcessPGN(pgn string) (string, error) {
	var games [][]parser.Move
	reader := strings.NewReader(pgn)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			return "", err
		}

		lexed := lexer.TokenizePGN(game)
		parsed := parser.ParseMoves(lexed)
		games = append(games, parsed)
	}

	return parser.ToJSON(games), nil
}

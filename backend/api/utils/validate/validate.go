package validate

import (
	"fmt"
	"strings"

	"github.com/corentings/chess/v2"
)

func ValidatePGN(pgn string) error {
	reader := strings.NewReader(pgn)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			return err
		}

		fmt.Println(game.GetTagPair("Site"))
	}

	return nil
}

package parser

import (
	"encoding/json"
	"myrepertoire.io/backend/api/utils/lexer"
	"strings"
)

type Move struct {
	MoveNo string `json:"moveNo"`
	White  string `json:"white,omitempty"`
	Black  string `json:"black,omitempty"`
}

func ParseMoves(tokens []lexer.Token) []Move {
	var moves []Move
	var i int

	for i < len(tokens) {
		tok := tokens[i]

		if tok.Kind == lexer.MOVE_NUM {
			move := Move{MoveNo: strings.TrimSuffix(tok.Literal, ".")}

			if i+1 < len(tokens) && tokens[i+1].Kind == lexer.MOVE {
				move.White = tokens[i+1].Literal
				i++
			}

			if i+1 < len(tokens) && tokens[i+1].Kind == lexer.MOVE {
				move.Black = tokens[i+1].Literal
				i++
			}

			moves = append(moves, move)
		}

		i++
	}

	return moves
}

func ToJSON(moves [][]Move) string {
	data, _ := json.MarshalIndent(moves, "", "  ")
	return string(data)
}

package lexer

import (
	"github.com/corentings/chess/v2"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func readPGNFile(t *testing.T, filename string) string {
	data, err := os.ReadFile(filepath.Join("..", "examples", filename))
	if err != nil {
		t.Fatalf("failed to read file: %v", err)
	}
	return string(data)
}

func TestGameZero(t *testing.T) {
	input := readPGNFile(t, "../examples/00.txt")
	reader := strings.NewReader(input)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())
	var tokens []Token

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			t.Fatalf("Couldn't read file")
		}

		tokens = TokenizePGN(game)
	}

	expected := []Token{
		{Kind: MOVE_NUM, Literal: "1."},
		{Kind: MOVE, Literal: "e4"},
		{Kind: MOVE, Literal: "e5"},
		{Kind: MOVE_NUM, Literal: "2."},
		{Kind: MOVE, Literal: "Nf3"},
		{Kind: MOVE, Literal: "Nc6"},
	}

	if len(tokens) != len(expected) {
		t.Fatalf("expected %d tokens, got %d", len(expected), len(tokens))
	}

	for i, tok := range tokens {
		if tok != expected[i] {
			t.Errorf("token %d mismatch: got %+v, expected %+v", i, tok, expected[i])
		}
	}
}

func TestGameOne(t *testing.T) {
	input := readPGNFile(t, "../examples/01.txt")
	reader := strings.NewReader(input)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())
	var tokens []Token

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			t.Fatalf("Couldn't read file")
		}

		tokens = TokenizePGN(game)
	}

	expected := []Token{
		{Kind: MOVE_NUM, Literal: "1."},
		{Kind: MOVE, Literal: "e4"},
		{Kind: MOVE, Literal: "d6"},
		{Kind: MOVE_NUM, Literal: "2."},
		{Kind: MOVE, Literal: "Nc3"},
		{Kind: MOVE, Literal: "Nf6"},
		{Kind: MOVE_NUM, Literal: "3."},
		{Kind: MOVE, Literal: "d4"},
		{Kind: MOVE, Literal: "g6"},
		{Kind: MOVE_NUM, Literal: "4."},
		{Kind: MOVE, Literal: "Bc4"},
		{Kind: MOVE, Literal: "Bg7"},
		{Kind: MOVE_NUM, Literal: "5."},
		{Kind: MOVE, Literal: "Nge2"},
		{Kind: MOVE, Literal: "O-O"},
		{Kind: MOVE_NUM, Literal: "6."},
		{Kind: MOVE, Literal: "O-O"},
		{Kind: MOVE, Literal: "Bg4"},
		{Kind: MOVE_NUM, Literal: "7."},
		{Kind: MOVE, Literal: "Be3"},
		{Kind: MOVE, Literal: "Bxe2"},
		{Kind: MOVE_NUM, Literal: "8."},
		{Kind: MOVE, Literal: "Qxe2"},
		{Kind: MOVE, Literal: "Nbd7"},
		{Kind: MOVE_NUM, Literal: "9."},
		{Kind: MOVE, Literal: "Rfe1"},
		{Kind: MOVE, Literal: "c5"},
		{Kind: MOVE_NUM, Literal: "10."},
		{Kind: MOVE, Literal: "Rad1"},
		{Kind: MOVE, Literal: "a6"},
		{Kind: MOVE_NUM, Literal: "11."},
		{Kind: MOVE, Literal: "a4"},
		{Kind: MOVE, Literal: "cxd4"},
		{Kind: MOVE_NUM, Literal: "12."},
		{Kind: MOVE, Literal: "Bxd4"},
		{Kind: MOVE, Literal: "Qa5"},
		{Kind: MOVE_NUM, Literal: "13."},
		{Kind: MOVE, Literal: "Bd5"},
		{Kind: MOVE, Literal: "Rab8"},
		{Kind: MOVE_NUM, Literal: "14."},
		{Kind: MOVE, Literal: "Bb3"},
		{Kind: MOVE, Literal: "Nc5"},
		{Kind: MOVE_NUM, Literal: "15."},
		{Kind: MOVE, Literal: "e5"},
		{Kind: MOVE, Literal: "Nxb3"},
		{Kind: MOVE_NUM, Literal: "16."},
		{Kind: MOVE, Literal: "exf6"},
		{Kind: MOVE, Literal: "Nxd4"},
		{Kind: MOVE_NUM, Literal: "17."},
		{Kind: MOVE, Literal: "Rxd4"},
		{Kind: MOVE, Literal: "Bxf6"},
		{Kind: MOVE_NUM, Literal: "18."},
		{Kind: MOVE, Literal: "Rd5"},
		{Kind: MOVE, Literal: "Qb4"},
		{Kind: MOVE_NUM, Literal: "19."},
		{Kind: MOVE, Literal: "Ne4"},
		{Kind: MOVE, Literal: "Bxb2"},
		{Kind: MOVE_NUM, Literal: "20."},
		{Kind: MOVE, Literal: "Ng5"},
		{Kind: MOVE, Literal: "e6"},
		{Kind: MOVE_NUM, Literal: "21."},
		{Kind: MOVE, Literal: "Rd3"},
		{Kind: MOVE, Literal: "d5"},
		{Kind: MOVE_NUM, Literal: "22."},
		{Kind: MOVE, Literal: "Rh3"},
		{Kind: MOVE, Literal: "h5"},
		{Kind: MOVE_NUM, Literal: "23."},
		{Kind: MOVE, Literal: "Qe3"},
		{Kind: MOVE, Literal: "Bf6"},
		{Kind: MOVE_NUM, Literal: "24."},
		{Kind: MOVE, Literal: "Nxe6"},
		{Kind: MOVE, Literal: "fxe6"},
		{Kind: MOVE_NUM, Literal: "25."},
		{Kind: MOVE, Literal: "Qxe6+"},
		{Kind: MOVE, Literal: "Kg7"},
		{Kind: MOVE_NUM, Literal: "26."},
		{Kind: MOVE, Literal: "Qd7+"},
		{Kind: MOVE, Literal: "Rf7"},
		{Kind: MOVE_NUM, Literal: "27."},
		{Kind: MOVE, Literal: "Qe6"},
		{Kind: MOVE, Literal: "Re7"},
		{Kind: MOVE_NUM, Literal: "28."},
		{Kind: MOVE, Literal: "Rhe3"},
		{Kind: MOVE, Literal: "Rxe6"},
		{Kind: MOVE_NUM, Literal: "29."},
		{Kind: MOVE, Literal: "Rxe6"},
	}

	if len(tokens) != len(expected) {
		t.Fatalf("expected %d tokens, got %d", len(expected), len(tokens))
	}

	for i, tok := range tokens {
		if tok != expected[i] {
			t.Errorf("token %d mismatch: got %+v, expected %+v", i, tok, expected[i])
		}
	}
}

func TestGameTwo(t *testing.T) {
	input := readPGNFile(t, "../examples/02.txt")
	reader := strings.NewReader(input)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())
	var tokens []Token

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			t.Fatalf("Couldn't read file")
		}

		tokens = TokenizePGN(game)
	}

	expected := []Token{
		{Kind: MOVE_NUM, Literal: "1."},
		{Kind: MOVE, Literal: "e4"},
		{Kind: MOVE, Literal: "e5"},
		{Kind: MOVE_NUM, Literal: "2."},
		{Kind: MOVE, Literal: "Bc4"},
		{Kind: MOVE, Literal: "Nc6"},
		{Kind: MOVE_NUM, Literal: "3."},
		{Kind: MOVE, Literal: "Qf3"},
		{Kind: MOVE, Literal: "a6"},
		{Kind: MOVE_NUM, Literal: "4."},
		{Kind: MOVE, Literal: "Qh5"},
		{Kind: MOVE, Literal: "Qe7"},
		{Kind: MOVE_NUM, Literal: "5."},
		{Kind: MOVE, Literal: "Qg5"},
		{Kind: MOVE, Literal: "Qd8"},
		{Kind: MOVE_NUM, Literal: "6."},
		{Kind: MOVE, Literal: "Qh5"},
		{Kind: MOVE, Literal: "Qe7"},
		{Kind: MOVE_NUM, Literal: "7."},
		{Kind: MOVE, Literal: "Qg5"},
		{Kind: MOVE, Literal: "Qd8"},
		{Kind: MOVE_NUM, Literal: "8."},
		{Kind: MOVE, Literal: "Qh5"},
	}

	if len(tokens) != len(expected) {
		t.Fatalf("expected %d tokens, got %d", len(expected), len(tokens))
	}

	for i, tok := range tokens {
		if tok != expected[i] {
			t.Errorf("token %d mismatch: got %+v, expected %+v", i, tok, expected[i])
		}
	}
}

func TestGameThree(t *testing.T) {
	input := readPGNFile(t, "../examples/03.txt")
	reader := strings.NewReader(input)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())
	var tokens []Token

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			t.Fatalf("Couldn't read file")
		}

		tokens = TokenizePGN(game)
	}

	expected := []Token{
		{Kind: MOVE_NUM, Literal: "1."},
		{Kind: MOVE, Literal: "e4"},
		{Kind: MOVE, Literal: "e5"},
		{Kind: MOVE_NUM, Literal: "2."},
		{Kind: MOVE, Literal: "Nf3"},
		{Kind: MOVE, Literal: "Nc6"},
		{Kind: MOVE_NUM, Literal: "3."},
		{Kind: MOVE, Literal: "Bb5"},
		{Kind: MOVE, Literal: "a6"},
	}

	if len(tokens) != len(expected) {
		t.Fatalf("expected %d tokens, got %d", len(expected), len(tokens))
	}

	for i, tok := range tokens {
		if tok != expected[i] {
			t.Errorf("token %d mismatch: got %+v, expected %+v", i, tok, expected[i])
		}
	}
}

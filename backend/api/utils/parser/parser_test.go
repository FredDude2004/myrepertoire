package parser

import (
	"github.com/corentings/chess/v2"
	"myrepertoire.io/backend/api/utils/lexer"
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

func TestParseMovesZero(t *testing.T) {
	input := readPGNFile(t, "../examples/00.txt")
	reader := strings.NewReader(input)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())
	var tokens []lexer.Token

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			t.Fatalf("Couldn't read file")
		}

		tokens = lexer.TokenizePGN(game)
	}

	expected := []Move{
		{MoveNo: "1", White: "e4", Black: "e5"},
		{MoveNo: "2", White: "Nf3", Black: "Nc6"},
	}

	result := ParseMoves(tokens)

	if len(result) != len(expected) {
		t.Fatalf("expected %d moves, got %d", len(expected), len(result))
	}

	for i, move := range result {
		if move != expected[i] {
			t.Errorf("move %d mismatch: expected %+v, got %+v", i+1, expected[i], move)
		}
	}
}

func TestParseMovesOne(t *testing.T) {
	input := readPGNFile(t, "../examples/01.txt")
	reader := strings.NewReader(input)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())
	var tokens []lexer.Token

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			t.Fatalf("Couldn't read file")
		}

		tokens = lexer.TokenizePGN(game)
	}

	expected := []Move{
		{MoveNo: "1", White: "e4", Black: "d6"},
		{MoveNo: "2", White: "Nc3", Black: "Nf6"},
		{MoveNo: "3", White: "d4", Black: "g6"},
		{MoveNo: "4", White: "Bc4", Black: "Bg7"},
		{MoveNo: "5", White: "Nge2", Black: "O-O"},
		{MoveNo: "6", White: "O-O", Black: "Bg4"},
		{MoveNo: "7", White: "Be3", Black: "Bxe2"},
		{MoveNo: "8", White: "Qxe2", Black: "Nbd7"},
		{MoveNo: "9", White: "Rfe1", Black: "c5"},
		{MoveNo: "10", White: "Rad1", Black: "a6"},
		{MoveNo: "11", White: "a4", Black: "cxd4"},
		{MoveNo: "12", White: "Bxd4", Black: "Qa5"},
		{MoveNo: "13", White: "Bd5", Black: "Rab8"},
		{MoveNo: "14", White: "Bb3", Black: "Nc5"},
		{MoveNo: "15", White: "e5", Black: "Nxb3"},
		{MoveNo: "16", White: "exf6", Black: "Nxd4"},
		{MoveNo: "17", White: "Rxd4", Black: "Bxf6"},
		{MoveNo: "18", White: "Rd5", Black: "Qb4"},
		{MoveNo: "19", White: "Ne4", Black: "Bxb2"},
		{MoveNo: "20", White: "Ng5", Black: "e6"},
		{MoveNo: "21", White: "Rd3", Black: "d5"},
		{MoveNo: "22", White: "Rh3", Black: "h5"},
		{MoveNo: "23", White: "Qe3", Black: "Bf6"},
		{MoveNo: "24", White: "Nxe6", Black: "fxe6"},
		{MoveNo: "25", White: "Qxe6+", Black: "Kg7"},
		{MoveNo: "26", White: "Qd7+", Black: "Rf7"},
		{MoveNo: "27", White: "Qe6", Black: "Re7"},
		{MoveNo: "28", White: "Rhe3", Black: "Rxe6"},
		{MoveNo: "29", White: "Rxe6", Black: ""},
	}

	result := ParseMoves(tokens)

	if len(result) != len(expected) {
		t.Fatalf("expected %d moves, got %d", len(expected), len(result))
	}

	for i, move := range result {
		if move != expected[i] {
			t.Errorf("move %d mismatch: expected %+v, got %+v", i+1, expected[i], move)
		}
	}
}

func TestParseMovesTwo(t *testing.T) {
	input := readPGNFile(t, "../examples/02.txt")
	reader := strings.NewReader(input)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())
	var tokens []lexer.Token

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			t.Fatalf("Couldn't read file")
		}

		tokens = lexer.TokenizePGN(game)
	}

	expected := []Move{
		{MoveNo: "1", White: "e4", Black: "e5"},
		{MoveNo: "2", White: "Bc4", Black: "Nc6"},
		{MoveNo: "3", White: "Qf3", Black: "a6"},
		{MoveNo: "4", White: "Qh5", Black: "Qe7"},
		{MoveNo: "5", White: "Qg5", Black: "Qd8"},
		{MoveNo: "6", White: "Qh5", Black: "Qe7"},
		{MoveNo: "7", White: "Qg5", Black: "Qd8"},
		{MoveNo: "8", White: "Qh5", Black: ""},
	}

	result := ParseMoves(tokens)

	if len(result) != len(expected) {
		t.Fatalf("expected %d moves, got %d", len(expected), len(result))
	}

	for i, move := range result {
		if move != expected[i] {
			t.Errorf("move %d mismatch: expected %+v, got %+v", i+1, expected[i], move)
		}
	}
}

func TestParseMovesThree(t *testing.T) {
	input := readPGNFile(t, "../examples/03.txt")
	reader := strings.NewReader(input)
	scanner := chess.NewScanner(reader, chess.WithExpandVariations())
	var tokens []lexer.Token

	for scanner.HasNext() {
		game, err := scanner.ParseNext()
		if err != nil {
			t.Fatalf("Couldn't read file")
		}

		tokens = lexer.TokenizePGN(game)
	}

	expected := []Move{
		{MoveNo: "1", White: "e4", Black: "e5"},
		{MoveNo: "2", White: "Nf3", Black: "Nc6"},
		{MoveNo: "3", White: "Bb5", Black: "a6"},
	}

	result := ParseMoves(tokens)

	if len(result) != len(expected) {
		t.Fatalf("expected %d moves, got %d", len(expected), len(result))
	}

	for i, move := range result {
		if move != expected[i] {
			t.Errorf("move %d mismatch: expected %+v, got %+v", i+1, expected[i], move)
		}
	}
}

package lexer

import (
	"fmt"
)

type TokenKind int

const (
	EOF TokenKind = iota
	ILLEGAL

	META_DATA

	MOVE_NUM
	MOVE
)

type Token struct {
	Kind    TokenKind
	Literal string
}

func (token Token) isOneOfMany(expectedTokens ...TokenKind) bool {
	for _, expected := range expectedTokens {
		if expected == token.Kind {
			return true
		}
	}

	return false
}

func (token Token) Debug() {
	if token.isOneOfMany(MOVE, MOVE_NUM) {
		fmt.Printf("%s (%s)\n", TokenKindString(token.Kind), token.Literal)
	} else {
		fmt.Printf("%s () \n", TokenKindString(token.Kind))
	}
}

func NewToken(kind TokenKind, literal string) Token {
	return Token{
		kind, literal,
	}
}

func TokenKindString(kind TokenKind) string {
	switch kind {
	case EOF:
		return "eof"
	case ILLEGAL:
		return "illegal"
	case META_DATA:
		return "meta_data"
	case MOVE_NUM:
		return "move_num"
	case MOVE:
		return "move"
	default:
		return fmt.Sprintf("unknown(%d)", kind)
	}

}

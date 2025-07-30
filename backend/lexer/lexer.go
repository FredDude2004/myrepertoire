package lexer

import (
	"fmt"
	"regexp"
)

type regexHandler func(lex *lexer, regex *regexp.Regexp)

type regexPattern struct {
	regex   *regexp.Regexp
	handler regexHandler
}

type lexer struct {
	patterns []regexPattern
	Tokens   []Token
	source   string
	pos      int
}

func (lex *lexer) advanceN(n int) {
	lex.pos += n
}

func (lex *lexer) push(token Token) {
	lex.Tokens = append(lex.Tokens, token)
}

func (lex lexer) at() byte {
	return lex.source[lex.pos]
}

func (lex lexer) remainder() string {
	return lex.source[lex.pos:]
}

func (lex lexer) at_eof() bool {
	return lex.pos >= len(lex.source)
}

func Tokenize(source string) []Token {
	lex := createLexer(source)

	for !lex.at_eof() {
		matched := false

		for _, pattern := range lex.patterns {
			loc := pattern.regex.FindStringIndex(lex.remainder())

			if loc != nil && loc[0] == 0 {
				pattern.handler(lex, pattern.regex)
				matched = true
				break
			}
		}

		if !matched {
			panic(fmt.Sprintf("Lexer::Error -> unrecognized token near %s\n", lex.remainder()))
		}
	}

	lex.push(NewToken(EOF, "EOF"))
	return lex.Tokens
}

func defaultHandler(kind TokenKind, literal string) regexHandler {
	return func(lex *lexer, regex *regexp.Regexp) {
		lex.advanceN(len(literal))
		lex.push(NewToken(kind, literal))
	}
}

func createLexer(source string) *lexer {
	return &lexer{
		pos:    0,
		source: source,
		Tokens: make([]Token, 0),
		patterns: []regexPattern{
			{regexp.MustCompile(`\[[^\]]*\]`), defaultHandler(META_DATA, "[*]")},
			{regexp.MustCompile(`\s+`), skipHandler},
			{regexp.MustCompile(`\b(?:[1-9]|[1-3][0-9]|40)\.`), moveNumHandler},
			{regexp.MustCompile(`\b(?:[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](?:=[QRBN])?[+#]?|O-O(?:-O)?[+#]?)\b`), moveHandler},
		},
	}
}

func skipHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindStringIndex(lex.remainder())
	lex.advanceN(match[1])
}

func moveHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindString(lex.remainder())
	lex.push(NewToken(MOVE, match))
	lex.advanceN(len(match))
}

func moveNumHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindString(lex.remainder())
	lex.push(NewToken(MOVE_NUM, match))
	lex.advanceN(len(match))
}

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

func (lex lexer) remainder() string {
	return lex.source[lex.pos:]
}

func (lex lexer) at_eof() bool {
	return lex.pos >= len(lex.source)
}

func TokenizePGN(source string) []Token {
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

	return lex.Tokens
}

func createLexer(source string) *lexer {
	return &lexer{
		pos:    0,
		source: source,
		Tokens: make([]Token, 0),
		patterns: []regexPattern{
			{regexp.MustCompile(`\[[^\]]*\]`), metaDataHandler},
			{regexp.MustCompile(`\{[^}]*\}`), commentHandler},
			{regexp.MustCompile(`\([^)]*\)`), variationsHandler},
			{regexp.MustCompile(`\s+`), skipHandler},
			{regexp.MustCompile(`\b(?:[1-9]|[1-3][0-9]|40)\.`), moveNumHandler},
			{regexp.MustCompile(`(?:[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](?:=[QRBN])?[+#]?|O-O(?:-O)?[+#]?)`), moveHandler},
			{regexp.MustCompile(`\b(?:1-0|0-1|1\/2-1\/2)\b`), resultHandler},
		},
	}
}

func metaDataHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindString(lex.remainder())
	// lex.push(NewToken(META_DATA, match)) **skipping METADATA tokens
	lex.advanceN(len(match))
}

func commentHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindString(lex.remainder())
	// lex.push(NewToken(META_DATA, match)) **skipping METADATA tokens
	lex.advanceN(len(match))
}

func variationsHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindString(lex.remainder())
	// lex.push(NewToken(META_DATA, match)) **skipping METADATA tokens
	lex.advanceN(len(match))
}

func skipHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindStringIndex(lex.remainder())
	lex.advanceN(match[1])
}

func moveNumHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindString(lex.remainder())
	lex.push(NewToken(MOVE_NUM, match))
	lex.advanceN(len(match))
}

func moveHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindString(lex.remainder())
	lex.push(NewToken(MOVE, match))
	lex.advanceN(len(match))
}

func resultHandler(lex *lexer, regex *regexp.Regexp) {
	match := regex.FindString(lex.remainder())
	// lex.push(NewToken(RESULT, match))  **skipping RESULT tokens
	lex.advanceN(len(match))
}

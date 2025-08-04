package utils

import (
	"encoding/json"
	"os"
	"reflect"
	"testing"
)

func readPGNFile(t *testing.T, filename string) string {
	data, err := os.ReadFile(filename)
	if err != nil {
		t.Fatalf("failed to read file: %v", err)
	}
	return string(data)
}

func TestGameZero(t *testing.T) {
	pgn := readPGNFile(t, "./examples/00.txt")

	expected := `
    [
  [
    {
      "moveNo": "1",
      "white": "e4",
      "black": "e5"
    },
    {
      "moveNo": "2",
      "white": "Nf3",
      "black": "Nc6"
    }
  ]
    ]
    `

	result, err := ProcessPGN(pgn)
	if err != nil {
		panic(err)
	}

	// Unmarshal both strings to interface{} for semantic comparison
	var expectedData any
	var resultData any

	if err := json.Unmarshal([]byte(expected), &expectedData); err != nil {
		t.Fatalf("Failed to unmarshal expected JSON: %v", err)
	}
	if err := json.Unmarshal([]byte(result), &resultData); err != nil {
		t.Fatalf("Failed to unmarshal result JSON: %v", err)
	}

	if !reflect.DeepEqual(expectedData, resultData) {
		t.Errorf("Expected:\n%v\n\nGot:\n%v", expectedData, resultData)
	}

}

func TestGameOne(t *testing.T) {
	pgn := readPGNFile(t, "./examples/01.txt")

	expected := `
[
  [
    {
      "moveNo": "1",
      "white": "e4",
      "black": "d6"
    },
    {
      "moveNo": "2",
      "white": "Nc3",
      "black": "Nf6"
    },
    {
      "moveNo": "3",
      "white": "d4",
      "black": "g6"
    },
    {
      "moveNo": "4",
      "white": "Bc4",
      "black": "Bg7"
    },
    {
      "moveNo": "5",
      "white": "Nge2",
      "black": "O-O"
    },
    {
      "moveNo": "6",
      "white": "O-O",
      "black": "Bg4"
    },
    {
      "moveNo": "7",
      "white": "Be3",
      "black": "Bxe2"
    },
    {
      "moveNo": "8",
      "white": "Qxe2",
      "black": "Nbd7"
    },
    {
      "moveNo": "9",
      "white": "Rfe1",
      "black": "c5"
    },
    {
      "moveNo": "10",
      "white": "Rad1",
      "black": "a6"
    },
    {
      "moveNo": "11",
      "white": "a4",
      "black": "cxd4"
    },
    {
      "moveNo": "12",
      "white": "Bxd4",
      "black": "Qa5"
    },
    {
      "moveNo": "13",
      "white": "Bd5",
      "black": "Rab8"
    },
    {
      "moveNo": "14",
      "white": "Bb3",
      "black": "Nc5"
    },
    {
      "moveNo": "15",
      "white": "e5",
      "black": "Nxb3"
    },
    {
      "moveNo": "16",
      "white": "exf6",
      "black": "Nxd4"
    },
    {
      "moveNo": "17",
      "white": "Rxd4",
      "black": "Bxf6"
    },
    {
      "moveNo": "18",
      "white": "Rd5",
      "black": "Qb4"
    },
    {
      "moveNo": "19",
      "white": "Ne4",
      "black": "Bxb2"
    },
    {
      "moveNo": "20",
      "white": "Ng5",
      "black": "e6"
    },
    {
      "moveNo": "21",
      "white": "Rd3",
      "black": "d5"
    },
    {
      "moveNo": "22",
      "white": "Rh3",
      "black": "h5"
    },
    {
      "moveNo": "23",
      "white": "Qe3",
      "black": "Bf6"
    },
    {
      "moveNo": "24",
      "white": "Nxe6",
      "black": "fxe6"
    },
    {
      "moveNo": "25",
      "white": "Qxe6+",
      "black": "Kg7"
    },
    {
      "moveNo": "26",
      "white": "Qd7+",
      "black": "Rf7"
    },
    {
      "moveNo": "27",
      "white": "Qe6",
      "black": "Re7"
    },
    {
      "moveNo": "28",
      "white": "Rhe3",
      "black": "Rxe6"
    },
    {
      "moveNo": "29",
      "white": "Rxe6"
    }
  ]
]
    `

	result, err := ProcessPGN(pgn)
	if err != nil {
		panic(err)
	}

	// Unmarshal both strings to interface{} for semantic comparison
	var expectedData any
	var resultData any

	if err := json.Unmarshal([]byte(expected), &expectedData); err != nil {
		t.Fatalf("Failed to unmarshal expected JSON: %v", err)
	}
	if err := json.Unmarshal([]byte(result), &resultData); err != nil {
		t.Fatalf("Failed to unmarshal result JSON: %v", err)
	}

	if !reflect.DeepEqual(expectedData, resultData) {
		t.Errorf("Expected:\n%v\n\nGot:\n%v", expectedData, resultData)
	}
}

func TestGameTwo(t *testing.T) {
	pgn := readPGNFile(t, "./examples/02.txt")

	expected := `
[
  [
    {
      "moveNo": "1",
      "white": "e4",
      "black": "e5"
    },
    {
      "moveNo": "2",
      "white": "Bc4",
      "black": "Nc6"
    },
    {
      "moveNo": "3",
      "white": "Qf3",
      "black": "a6"
    },
    {
      "moveNo": "4",
      "white": "Qh5",
      "black": "Qe7"
    },
    {
      "moveNo": "5",
      "white": "Qg5",
      "black": "Qd8"
    },
    {
      "moveNo": "6",
      "white": "Qh5",
      "black": "Qe7"
    },
    {
      "moveNo": "7",
      "white": "Qg5",
      "black": "Qd8"
    },
    {
      "moveNo": "8",
      "white": "Qh5"
    }
  ]
]
    `

	result, err := ProcessPGN(pgn)
	if err != nil {
		panic(err)
	}

	// Unmarshal both strings to interface{} for semantic comparison
	var expectedData any
	var resultData any

	if err := json.Unmarshal([]byte(expected), &expectedData); err != nil {
		t.Fatalf("Failed to unmarshal expected JSON: %v", err)
	}
	if err := json.Unmarshal([]byte(result), &resultData); err != nil {
		t.Fatalf("Failed to unmarshal result JSON: %v", err)
	}

	if !reflect.DeepEqual(expectedData, resultData) {
		t.Errorf("Expected:\n%v\n\nGot:\n%v", expectedData, resultData)
	}
}

func TestGameThree(t *testing.T) {
	pgn := readPGNFile(t, "./examples/03.txt")

	expected := `
[
  [
    {
      "moveNo": "1",
      "white": "e4",
      "black": "e5"
    },
    {
      "moveNo": "2",
      "white": "Nf3",
      "black": "Nc6"
    },
    {
      "moveNo": "3",
      "white": "Bb5",
      "black": "a6"
    }
  ]
]
    `

	result, err := ProcessPGN(pgn)
	if err != nil {
		panic(err)
	}

	// Unmarshal both strings to interface{} for semantic comparison
	var expectedData any
	var resultData any

	if err := json.Unmarshal([]byte(expected), &expectedData); err != nil {
		t.Fatalf("Failed to unmarshal expected JSON: %v", err)
	}
	if err := json.Unmarshal([]byte(result), &resultData); err != nil {
		t.Fatalf("Failed to unmarshal result JSON: %v", err)
	}

	if !reflect.DeepEqual(expectedData, resultData) {
		t.Errorf("Expected:\n%v\n\nGot:\n%v", expectedData, resultData)
	}
}

func TestGameFour(t *testing.T) {
	pgn := readPGNFile(t, "./examples/04.txt")

	expected := `
[
  [
    {
      "moveNo": "1",
      "white": "e4",
      "black": "e5"
    },
    {
      "moveNo": "2",
      "white": "Nc3",
      "black": "Nf6"
    },
    {
      "moveNo": "3",
      "white": "f4",
      "black": "d5"
    },
    {
      "moveNo": "4",
      "white": "fxe5",
      "black": "Nxe4"
    },
    {
      "moveNo": "5",
      "white": "Qf3",
      "black": "Nxc3"
    },
    {
      "moveNo": "6",
      "white": "bxc3",
      "black": "c5"
    },
    {
      "moveNo": "7",
      "white": "d4"
    }
  ],
  [
    {
      "moveNo": "1",
      "white": "e4",
      "black": "e5"
    },
    {
      "moveNo": "2",
      "white": "Nc3",
      "black": "Nf6"
    },
    {
      "moveNo": "3",
      "white": "f4",
      "black": "exf4"
    },
    {
      "moveNo": "4",
      "white": "e5",
      "black": "Qe7"
    },
    {
      "moveNo": "5",
      "white": "Qe2",
      "black": "Ng8"
    },
    {
      "moveNo": "6",
      "white": "Nf3",
      "black": "Nc6"
    },
    {
      "moveNo": "7",
      "white": "d4"
    }
  ],
  [
    {
      "moveNo": "1",
      "white": "e4",
      "black": "e5"
    },
    {
      "moveNo": "2",
      "white": "Nc3",
      "black": "Nc6"
    },
    {
      "moveNo": "3",
      "white": "Bc4",
      "black": "Nf6"
    },
    {
      "moveNo": "4",
      "white": "d3",
      "black": "Bb4"
    },
    {
      "moveNo": "5",
      "white": "Ne2",
      "black": "O-O"
    }
  ]
]
    `

	result, err := ProcessPGN(pgn)
	if err != nil {
		panic(err)
	}

	// Unmarshal both strings to interface{} for semantic comparison
	var expectedData any
	var resultData any

	if err := json.Unmarshal([]byte(expected), &expectedData); err != nil {
		t.Fatalf("Failed to unmarshal expected JSON: %v", err)
	}
	if err := json.Unmarshal([]byte(result), &resultData); err != nil {
		t.Fatalf("Failed to unmarshal result JSON: %v", err)
	}

	if !reflect.DeepEqual(expectedData, resultData) {
		t.Errorf("Expected:\n%v\n\nGot:\n%v", expectedData, resultData)
	}
}

package aoc

import (
	"fmt"

	"github.com/simonhylander/advent-of-code-2022/pkg/days"
)

type Puzzle interface {
	PartA([]string) any
	PartB([]string) any
}

var puzzles = map[int]Puzzle{
	1: days.Day1{},
}

func NewPuzzle(day int) Puzzle {
	puzzle, ok := puzzles[day]

	if !ok {
		fmt.Println(fmt.Sprintf("Day not found: %d", day))
	}
	return puzzle
}

func Run(day int, p Puzzle, input []string) {
	fmt.Println(fmt.Sprintf("Day %d, Part A: %v", day, p.PartA(input)))
	fmt.Println(fmt.Sprintf("Day %d, Part B: %v", day, p.PartB(input)))
}

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
	2: days.Day2{},
	3: days.Day3{},
	4: days.Day4{},
	5: days.Day5{},
	// 6:  days.Day6{},
	// 7:  days.Day7{},
	// 8:  days.Day8{},
	// 9:  days.Day9{},
	// 10: days.Day10{},
	// 11: days.Day11{},
	// 12: days.Day12{},
	// 13: days.Day13{},
	// 14: days.Day14{},
	// 15: days.Day15{},
	// 16: days.Day16{},
	// 17: days.Day17{},
	// 18: days.Day18{},
	// 19: days.Day19{},
	// 20: days.Day20{},
	// 21: days.Day21{},
	// 22: days.Day22{},
	// 23: days.Day23{},
	// 24: days.Day24{},
	// 25: days.Day25{},
}

func NewPuzzle(day int) Puzzle {
	puzzle, ok := puzzles[day]

	if !ok {
		fmt.Println(fmt.Sprintf("Day not found: %d", day))
	}
	return puzzle
}

func Run(day int, part string, p Puzzle, input []string) {

	if part == "a" {
		fmt.Println(fmt.Sprintf("Day %d, Part A: %v", day, p.PartA(input)))
		return
	}

	if part == "b" {
		fmt.Println(fmt.Sprintf("Day %d, Part B: %v", day, p.PartB(input)))
		return
	}
}

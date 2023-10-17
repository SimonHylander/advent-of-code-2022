package days

import (
	"fmt"
	"strconv"
	"strings"
)

func (p Day8) PartA(input string) any {
	grid := makeGrid(input)

	fmt.Println(input)
	// fmt.Println(grid)
	outerEdges := 4*len(grid) - 4
	fmt.Println(outerEdges)

	for y := 1; y < len(grid)-1; y++ {
		fmt.Println(grid[y])

		for x := 0; x < len(grid[y]); x++ {
			height := grid[y][x]
			fmt.Println(height)

			column := getColumn(x)
			fmt.Println(column)

			left := grid[y][0:x]
			right := grid[y][x+1 : len(grid[y])]

			fmt.Println("left", left)
			fmt.Println("right", right)
			//
			if len(grid) >= y {
				// fmt.Println(y)
				// up := grid[0 : y-1][x]
				// fmt.Println("up", up)
			}

			if len(grid) >= y+1 {
				// down := grid[y+1 : len(grid[y])][x]
				// fmt.Println("down", down)
			}

			fmt.Println("-----")
		}
	}

	return "implement_me"
}

func (p Day8) PartB(lines string) any {
	return "implement_me"
}

func makeGrid(input string) [][]int {
	lines := strings.Split(input, "\n")

	var grid [][]int = make([][]int, len(lines))

	for i := 0; i < len(lines); i++ {
		line := strings.Split(lines[i], "")

		for j := 0; j < len(line); j++ {
			num, _ := strconv.Atoi(line[j])
			grid[i] = append(grid[i], num)
		}
	}

	return grid
}

func getColumn(grid [][]int, x int) []int {
	column := make([]int, len(grid))

	for i := 0; i < len(grid); i++ {
		column[i] = grid[x]
	}

	return column
}

package aoc

import (
	"fmt"
	"io/ioutil"
	"strings"
)

func Input(day int) []string {
	fileName := fmt.Sprintf("./pkg/days/input/day%d.txt", day)
	return readFile(fileName)
}

func readFile(fileName string) []string {
	b, err := ioutil.ReadFile(fileName)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(b), "\n")
	return lines
}

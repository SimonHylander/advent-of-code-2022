package aoc

import (
	"fmt"
	"io/ioutil"
)

func Input(day int, test bool) string {
	var fileName string
	if test {
		fileName = fmt.Sprintf("./pkg/days/input/day%d_test.txt", day)
	} else {
		fileName = fmt.Sprintf("./pkg/days/input/day%d.txt", day)
	}

	return readFile(fileName)
}

func readFile(fileName string) string {
	b, err := ioutil.ReadFile(fileName)
	if err != nil {
		panic(err)
	}

	return string(b)
}

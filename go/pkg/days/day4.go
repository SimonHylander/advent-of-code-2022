package days

import (
	"strconv"
	"strings"

	"github.com/simonhylander/advent-of-code-2022/pkg/util"
)

func (p Day4) PartA(lines []string) any {
	result := 0
	for _, line := range lines {
		sections := strings.Split(line, ",")
		firstSection, _ := sliceAtoi(strings.Split(sections[0], "-"))
		secondSection, _ := sliceAtoi(strings.Split(sections[1], "-"))

		firstStart := firstSection[0]
		firstEnd := firstSection[1]

		secondStart := secondSection[0]
		secondEnd := secondSection[1]

		if firstStart >= secondStart && firstEnd <= secondEnd {
			result++
		} else if secondStart >= firstStart && secondEnd <= firstEnd {
			result++
		}
	}

	return result
}

func (p Day4) PartB(lines []string) any {
	result := 0
	for _, line := range lines {
		sections := strings.Split(line, ",")
		firstSection, _ := sliceAtoi(strings.Split(sections[0], "-"))
		secondSection, _ := sliceAtoi(strings.Split(sections[1], "-"))

		firstStart := firstSection[0]
		firstEnd := firstSection[1]

		secondStart := secondSection[0]
		secondEnd := secondSection[1]

		firstNumbers := util.Range(firstStart, firstEnd)
		secondNumbers := util.Range(secondStart, secondEnd)

		hasOverlap := secondNumbers[0] <= firstNumbers[len(firstNumbers)-1] && firstNumbers[0] <= secondNumbers[len(secondNumbers)-1]

		if hasOverlap {
			result++
		}
	}

	return result
}

func sliceAtoi(sa []string) ([]int, error) {
	si := make([]int, 0, len(sa))
	for _, a := range sa {
		i, err := strconv.Atoi(a)
		if err != nil {
			return si, err
		}
		si = append(si, i)
	}
	return si, nil
}

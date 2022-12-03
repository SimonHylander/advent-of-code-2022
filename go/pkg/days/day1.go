package days

import (
	"sort"
	"strconv"
)

func (p Day1) PartA(lines []string) any {
	calories := make(map[int]int)

	i := 0
	for _, line := range lines {
		if line == "" {
			i++
			continue
		}

		c, _ := strconv.Atoi(line)

		if val, ok := calories[i]; ok {
			calories[i] = val + c
		} else {
			calories[i] = c
		}
	}

	maxValue := 0
	maxIndex := 0
	for i, v := range calories {
		if v > maxValue {
			maxValue = v
			maxIndex = i
		}
	}

	return calories[maxIndex]
}

func (p Day1) PartB(lines []string) any {
	calories := make(map[int]int)

	i := 0
	for _, line := range lines {
		if line == "" {
			i++
			continue
		}

		c, _ := strconv.Atoi(line)

		if val, ok := calories[i]; ok {
			calories[i] = val + c
		} else {
			calories[i] = c
		}
	}

	top3 := make([]int, len(calories))

	for i, v := range calories {
		top3[i] = v
	}

	sort.Slice(top3, func(i, j int) bool {
		return top3[i] > top3[j]
	})

	top3Total := 0

	for _, v := range top3[0:3] {
		top3Total += v
	}

	return top3Total
}

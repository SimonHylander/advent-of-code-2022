package days

import (
	"fmt"
	"strings"
)

func (p Day2) PartA(lines []string) any {
	rock := 1
	paper := 2
	scissors := 3

	scores := map[string]int{
		"X": rock,
		"Y": paper,
		"Z": scissors,
	}

	strat := map[string]string{
		"A": "Y",
		"B": "Z",
		"C": "X",
	}

	translate := map[string]string{
		"X": "A",
		"Y": "B",
		"Z": "C",
	}

	total := 0

	for _, line := range lines {
		round := strings.Split(line, " ")

		if len(round) < 2 {
			fmt.Println(line)
			fmt.Println(round)
			continue
		}

		opponent := strings.Split(line, " ")[0]
		answer := strings.Split(line, " ")[1]

		answerForWin := strat[opponent]

		translatedAnswer := translate[answer]

		roundScore := scores[answer]

		if answer == answerForWin {
			// win
			roundScore += 6
			fmt.Println("win")
		} else if translatedAnswer == opponent {
			fmt.Println("draw")
			// draw
			roundScore += 3
		} else {
			// loss
			fmt.Println("loss")
			roundScore += 0
		}

		total += roundScore
	}

	return total
}

func (p Day2) PartB(lines []string) any {

	rock := 1
	paper := 2
	scissors := 3

	scores := map[string]int{
		"X": rock,
		"Y": paper,
		"Z": scissors,
	}

	/* opponentScores := map[string]int{
		"A": rock,
		"B": paper,
		"C": scissors,
	} */

	translateOpponent := map[string]string{
		"A": "X",
		"B": "Y",
		"C": "X",
	}

	strat := map[string]string{
		"A": "Y",
		"B": "Z",
		"C": "X",
	}

	losers := map[string]map[string]string{
		"A": {
			"loss": "Y",
		},
		"B": {
			"loss": "Z",
		},
		"C": {
			"loss": "X",
		},
	}

	weo := map[string]int{
		"A X": 3,
		"A Y": 3,
		"A Z": 3,

		"B X": 1,
		"B Y": 5,
		"B Z": 9,

		"C X": 2,
		"C Y": 6,
		"C Z": 7,
	}

	total := 0

	for _, line := range lines {
		round := strings.Split(line, " ")

		if len(round) < 2 {
			continue
		}

		opponent := strings.Split(line, " ")[0]
		answer := strings.Split(line, " ")[1]
		roundScore := 0

		isLoss := answer == "X"
		isDraw := answer == "Y"
		isWin := answer == "Z"

		fmt.Println(fmt.Sprintf("opponent: %s", opponent))
		fmt.Println(fmt.Sprintf("answer: %s", answer))

		if isWin {
			fmt.Println("win")
			// get what beats opponent
			actual := strat[opponent]
			fmt.Println("acutal", actual, scores[actual])
			roundScore += scores[actual] + 6
		} else if isDraw {
			fmt.Println("draw")
			// get what beats opponent
			actual := translateOpponent[opponent]
			fmt.Println("acutal", actual, scores[actual])
			roundScore += scores[actual] + 3
			// roundScore += opponentScores[opponent] + 3
		} else if isLoss {
			// loss
			fmt.Println("loss", opponent, answer)
			actual := losers[opponent]["loss"]
			fmt.Println("acutal", actual, scores[actual])
			fmt.Println("answer", answer, scores[answer])
			// roundScore += scores[actual]
			roundScore += scores[answer]
			// roundScore += (opponentScores[opponent] - 1) % 3
		}

		fmt.Println("round", roundScore)
		fmt.Println("------------------")
		total += weo[line]

		// total += roundScore
	}

	/* mopp := map[string]int{
		"A X": 1 + 3,
		"A Y": 2 + 6,
		"A Z": 3 + 0,
		"B X": 1 + 0,
		"B Y": 2 + 3,
		"B Z": 3 + 6,
		"C X": 1 + 6,
		"C Y": 2 + 0,
		"C Z": 3 + 3,
	} */

	// print( sum(
	// { "A X": 1 + 3, "A Y": 2 + 6, "A Z": 3 + 0,
	//   "B X": 1 + 0, "B Y": 2 + 3, "B Z": 3 + 6,
	//   "C X": 1 + 6, "C Y": 2 + 0, "C Z": 3 + 3 }[ l.strip() ]
	// for l in fileinput.input() ) )

	/* total := 0

	for _, line := range lines {
		fmt.Println(mopp[line])
		total += mopp[line]
	} */

	fmt.Println(total)

	return total
}

/* switch opponent {
		case "A":
			switch answer {
			case "X":
				total = rock(total)
				total = draw(total)
				break
			case "Y":
				total = win(total)
				total = paper(total)
				break
			case "Z":
				total = scissors(total)
				break
			}
			break

		case "B":
			switch answer {
			case "X":
				total = rock(total)
				break
			case "Y":
				total = paper(total)
				total = draw(total)
				break
			case "Z":
				total = scissors(total)
				total = win(total)
				break
			}

			break

		case "C":
			switch answer {
			case "X":
				total = rock(total)
				total = win(total)
				break
			case "Y":
				total = paper(total)
				break
			case "Z":
				total = scissors(total)
				total = draw(total)
				break
			}

			break
		}

func win(score int) int {
	return score + 6
}

func loss(score int) int {
	return score
}

func draw(score int) int {
	return score + 3
}

func paper(score int) int {
	return score + 2
}

func rock(score int) int {
	return score + 1
}

func scissors(score int) int {
	return score + 3
}
*/

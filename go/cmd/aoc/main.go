package main

import (
	"fmt"
	"os"
	"time"

	"github.com/simonhylander/advent-of-code-2022/pkg/aoc"
	"github.com/spf13/cobra"
)

var day int
var part string
var test bool

var rootCmd = &cobra.Command{
	Use:   "aoc",
	Short: "Run Advent of Code puzzles",
}

var runCmd = &cobra.Command{
	Use:   "run",
	Short: "Run a puzzle",
	Run: func(cmd *cobra.Command, args []string) {
		if day > 0 {
			if len(part) > 0 {
				runDay(day, part, test)
			} else {
				runDay(day, "a", test)
				runDay(day, "b", test)
			}

			return
		}
	},
}

func Execute() {
	rootCmd.PersistentFlags().IntVarP(&day, "day", "d", 0, "day input")
	rootCmd.PersistentFlags().StringVarP(&part, "part", "p", "", "part input")
	rootCmd.PersistentFlags().BoolVarP(&test, "test", "t", false, "test input")
	rootCmd.AddCommand(runCmd)

	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func runDay(day int, part string, test bool) {
	aoc.Run(day, part, aoc.NewPuzzle(day), aoc.Input(day, test))
}

func main() {
	start := time.Now()
	Execute()
	duration := time.Since(start)
	var ms float64 = (float64(duration.Microseconds())) / float64(time.Millisecond)
	fmt.Println("ms:", ms)
}

package main

import (
	"os"

	"github.com/simonhylander/advent-of-code-2022/pkg/aoc"
	"github.com/spf13/cobra"
)

var day int

var rootCmd = &cobra.Command{
	Use:   "aoc",
	Short: "Run Advent of Code puzzles",
}

var runCmd = &cobra.Command{
	Use:   "run",
	Short: "Run a puzzle",
	Run: func(cmd *cobra.Command, args []string) {
		if day > 0 {
			runDay(day)
			return
		}
	},
}

func Execute() {
	rootCmd.PersistentFlags().IntVarP(&day, "day", "d", 0, "day input")
	rootCmd.AddCommand(runCmd)

	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

func runDay(day int) {
	aoc.Run(day, aoc.NewPuzzle(day), aoc.Input(day))
}

func main() {
	Execute()
}

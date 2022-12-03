import * as p from "https://deno.land/std@0.165.0/path/mod.ts";

// const input = await Deno.readTextFile("input/day1/day1.txt");
const input = await Deno.readTextFile("./day2.txt");
const lines = input.split("\n");
console.log(lines)
// console.log(lines);

  const scores = new Map<string, number>()

  let total = 0

  scores.set("A X", 3)
  scores.set("A Y", 4)
  scores.set("A Z", 8)

  scores.set("B X", 1)
  scores.set("B Y", 5)
  scores.set("B Z", 9)

  scores.set("C X", 2)
  scores.set("C Y", 6)
  scores.set("C Z", 7)

  lines.map(score => {
    total += scores.get(score) ?? 0
  })

  console.log(total);
  

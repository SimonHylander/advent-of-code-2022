export {};

const input = await Deno.readTextFile(
  new URL("./day2.txt", import.meta.url),
)
  .then((input) => input.split("\n"));

const expected = 12091;
let result = 0;

const scores = new Map<string, number>();

scores.set("A X", 3);
scores.set("A Y", 4);
scores.set("A Z", 8);

scores.set("B X", 1);
scores.set("B Y", 5);
scores.set("B Z", 9);

scores.set("C X", 2);
scores.set("C Y", 6);
scores.set("C Z", 7);

input.map((score) => {
  result += scores.get(score) ?? 0;
});

console.log("result:", result);
console.assert(expected === result);

export {};

const input = await Deno.readTextFile(
  new URL("./day2.txt", import.meta.url),
)
  .then((input) => input.split("\n"));

const expected = 14163;
let result = 0;

const rock = 1;
const paper = 2;
const scissors = 3;

const scores = new Map<string, number>([
  ["X", rock],
  ["Y", paper],
  ["Z", scissors],
]);

const strat = new Map<string, string>([
  ["A", "Y"],
  ["B", "Z"],
  ["C", "X"],
]);

input.forEach((line) => {
  const round = line.split(" ");

  if (round.length < 2) {
    return;
  }

  const opponent = round[0];
  const player = round[1];
  const answerForWin = strat.get(opponent);

  let opponentEquivalent = "";
  if (player === "X") opponentEquivalent = "A";
  if (player === "Y") opponentEquivalent = "B";
  if (player === "Z") opponentEquivalent = "C";

  let roundScore = scores.get(player) ?? 0;

  if (player == answerForWin) {
    // win
    roundScore += 6;
  } else if (opponentEquivalent == opponent) {
    // draw
    roundScore += 3;
  } else {
    // loss
    roundScore += 0;
  }

  result += roundScore;
});

console.log("result:", result);
console.assert(expected === result);

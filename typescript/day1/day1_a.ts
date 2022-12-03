export {};

const input = await Deno.readTextFile(
  new URL("./day1.txt", import.meta.url),
)
  .then((input) => input.split("\n"));

const expected = 70116;
let result = 0;

const calories = new Map<number, number>();

let i = 0;
input.forEach((line) => {
  if (line === "") {
    i++;
    return;
  }

  const calorie = +line;

  if (calories.has(i)) {
    // @ts-ignore xd
    calories.set(i, calories.get(i) + calorie);
  } else {
    calories.set(i, calorie);
  }
});

let maxValue = 0;
let maxIndex = 0;

calories.forEach((value, index) => {
  if (value > maxValue) {
    maxValue = value;
    maxIndex = index;
  }
});

result = calories.get(maxIndex) ?? 0;

console.log("result:", result);
console.assert(expected === result);

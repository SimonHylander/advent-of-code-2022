export {};

const input = await Deno.readTextFile(
  new URL("./day1.txt", import.meta.url),
)
  .then((input) => input.split("\n"));

const expected = 206582;
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

const top3 = Array.from(calories.values());
top3.sort((a, b) => b - a);

result = top3.slice(0, 3).reduce((a, b) => a + b, 0);

console.log("result:", result);
console.assert(expected === result);

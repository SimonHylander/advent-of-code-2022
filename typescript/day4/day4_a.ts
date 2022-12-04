export {};

const input = await Deno.readTextFile(
  new URL("./day4.txt", import.meta.url),
)
  .then((input) => input.split("\n"));

const expected = 534;

const result = input.reduce((total, line) => {
  const [firstSection, secondSection] = line.split(",");
  const [firstStart, firstEnd] = firstSection.split("-").map((n) => +n);
  const [secondStart, secondEnd] = secondSection.split("-").map((n) => +n);

  if (
    firstStart >= secondStart &&
    firstEnd <= secondEnd
  ) {
    total++;
  } else if (
    secondStart >= firstStart &&
    secondEnd <= firstEnd
  ) {
    total++;
  }

  return total;
}, 0);

console.log("result:", result);
console.assert(expected === result);

export {};

const input = await Deno.readTextFile(new URL("./day4.txt", import.meta.url));
// const input = await Deno.readTextFile(new URL("./day4_test.txt", import.meta.url));
const lines = input.split("\n");

const expected = 841;
let result = 0;

result = lines.reduce((total, line) => {
  const [firstSection, secondSection] = line.split(",");
  const [firstStart, firstEnd] = firstSection.split("-").map((n) => +n);
  const [secondStart, secondEnd] = secondSection.split("-").map((n) => +n);

  const firstNumbers: number[] = Array.from(
    { length: firstEnd - (firstStart - 1) },
    (_, i) => i + firstStart,
  );

  const secondNumbers: number[] = Array.from(
    { length: (secondEnd) - (secondStart - 1) },
    (_, i) => i + secondStart,
  );

  if (secondNumbers.some((n) => firstNumbers.includes(n))) {
    total++;
  }

  return total;
}, 0);

console.log("result:", result);
console.assert(expected === result);

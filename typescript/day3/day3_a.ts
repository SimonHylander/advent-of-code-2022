export {};

const input = await Deno.readTextFile(new URL("./day4.txt", import.meta.url));
// const input = await Deno.readTextFile(new URL("./day4_test.txt", import.meta.url));
const lines = input.split("\n");

const expected = 8401;
let result = 0;

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

lines.forEach((line) => {
  const firstCompartment = line.slice(0, line.length / 2);
  const secondCompartment = line.slice(line.length / 2);

  const commonLetters = firstCompartment.split("").filter((letter) => {
    return secondCompartment.includes(letter);
  });

  const priority = alphabet.indexOf(commonLetters[0]) + 1;
  result += priority;
});

console.log("result:", result);
console.assert(expected === result);

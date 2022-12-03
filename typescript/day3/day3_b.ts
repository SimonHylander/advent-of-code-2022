export {};

const input = await Deno.readTextFile(new URL("./day3.txt", import.meta.url))
  .then((input) => input.split("\n"));

const expected = 2641;
let result = 0;

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const groupMap = new Map<number, string[]>();

let counter = 0;
for (let i = 0; i < input.length; i += 3) {
  if (groupMap.has(counter)) {
    // @ts-ignore - ts.. yikes
    groupMap.get(counter).push(input[i], input[i + 1], input[i + 2]);
  } else {
    groupMap.set(counter, [
      input[i],
      input[i + 1],
      input[i + 2],
    ]);
  }

  counter++;
}

groupMap.forEach((items) => {
  const commonLetters = items[0].split("").filter((letter) => {
    return items[1].includes(letter) && items[2].includes(letter);
  });

  const priority = alphabet.indexOf(commonLetters[0]) + 1;
  result += priority;
});

console.log("result:", result);
console.assert(expected === result);

export {};

const input = await Deno.readTextFile(new URL("./day4.txt", import.meta.url));
// const input = await Deno.readTextFile(new URL("./day4_test.txt", import.meta.url));
const lines = input.split("\n");

const expected = 2641;
let result = 0;

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const groupMap = new Map<number, string[]>();

let counter = 0;
for (let i = 0; i < lines.length; i += 3) {
  if (groupMap.has(counter)) {
    // @ts-ignore - ts.. yikes
    groupMap.get(counter).push(lines[i], lines[i + 1], lines[i + 2]);
  } else {
    groupMap.set(counter, [
      lines[i],
      lines[i + 1],
      lines[i + 2],
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

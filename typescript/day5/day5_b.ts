export {};

const filename = "./day5.txt";
// const filename = "./day5_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const expected = "WDLPFNNNB";
let result = "";

const [crateInput, instructions] = input.split("\n\n");
const stacks: string[][] = [];
const toStack = crateInput.split("\n").reverse().slice(1);
const lineLength = toStack[0].length;
const crateLength = "[A] ".length;

for (let i = 0; i < (lineLength + 1) / crateLength; i++) {
  const c = toStack.map((s) => {
    return s.slice(i * crateLength, i * crateLength + 3).trim();
  }).filter((s) => s.length > 0);

  stacks.push(c);
}

instructions.split("\n").forEach((instruction) => {
  const c = instruction.split(" ");
  const amount = +c[1];
  const fromStack = +c[3];
  const toStack = +c[5];

  const toMove = stacks[fromStack - 1].splice(
    stacks[fromStack - 1].length - amount,
  );

  stacks[toStack - 1] = stacks[toStack - 1].concat(toMove);
});

result = stacks.flatMap((x) =>
  x[x.length - 1].replace("[", "").replace("]", "")
)
  .join("");

console.log("result:", result);
console.assert(expected === result);

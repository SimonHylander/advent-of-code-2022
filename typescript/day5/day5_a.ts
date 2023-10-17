export {};

const filename = "./day5.txt";
// const filename = "./day5_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const lines = input.split("\n");

const expected = "ZBDRNPMVH";
let result = "";
/*
const [topHalf, rest] = input.split("\n\n");

const stacks: string[][] = [];

const toStack = topHalf.split("\n").reverse().slice(1);

for (let i = 0; i < (toStack[0].length + 1) / 4; i++) {
  stacks.push(toStack.map((x) => x.slice(i * 4, i * 4 + 3)));
}

const clearEmptyStrings = () => {
  stacks.forEach((stack) => {
    while (stack[stack.length - 1] === "   ") {
      stack.pop();
    }
  });
};

clearEmptyStrings();

const ins = rest.split("\n");

for (const in_ of ins) {
  const c = in_.split(" ");
  const count = c[1];
  const from = c[3];
  const to = c[5];

  const from_ = +from - 1;
  const to_ = +to - 1;
  const count_ = +count;

  const b = stacks[from_].splice(stacks[from_].length - count_);
  stacks[to_] = stacks[to_].concat(b.reverse());
}

stacks.forEach((x) => console.log(x[x.length - 1])); */

const [crateInput, instructions] = input.split("\n\n");
const stacks: string[][] = [];
const toStack = crateInput.split("\n").reverse().slice(1);
const lineLength = toStack[0].length;
const crateLength = "[A] ".length;

for (let i = 0; i < (lineLength + 1) / crateLength; i++) {
  const c = toStack.map((x) => {
    return x.slice(i * crateLength, i * crateLength + 3).trim();
  }).filter((x) => x.length > 0);

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

  stacks[toStack - 1] = stacks[toStack - 1].concat(toMove.reverse());
});

// console.log("stacks");
console.log(stacks);
//
result = stacks.flatMap((x) =>
  x[x.length - 1].replace("[", "").replace("]", "")
)
  .join("");

console.log("result:", result);
console.assert(expected === result);

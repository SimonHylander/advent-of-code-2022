export {};

const filename = "./day10.txt";
// const filename = "./day10_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const lines = input.split("\n");

const expected = 0;
let result = 0;

let cycle = 0;
let x = 1;
let signalStrength = 0;

const cycleSet = new Map<number, number>();

const executeCycle = (cycle: number) => {
  if (cycle > 220) return;

  if (((cycle % 40) === 20)) {
    const signal = cycle * x;
    console.log("cycle:", cycle);
    console.log("x:", x);
    console.log("signal:", signal);
    console.log("------");

    if (!cycleSet.has(cycle)) {
      cycleSet.set(cycle, signal);
    }
  }
};

for (const line of lines) {
  const [op, num] = line.split("addx ");
  console.log("------");
  //   console.log(line);
  executeCycle(cycle);

  if (line === "noop") {
    cycle++;
  } else {
    const [_, num] = line.split("addx ");
    const addx = parseInt(num);

    for (let i = 0; i < 2; i++) {
      cycle++;
      executeCycle(cycle);
    }

    x += addx;
  }
}

result = Array.from(cycleSet)
  .flatMap(([_, signal]) => signal)
  .reduce((total, value) => total + value, 0);

console.log("result:", result);
console.assert(expected === result);

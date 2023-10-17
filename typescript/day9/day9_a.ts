export {};

const filename = "./day9.txt";
// const filename = "./day9_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const lines = input.split("\n");

const expected = 0;
let result = 0;

const h = {
  y: 0,
  x: 0,
};

const t = {
  y: 0,
  x: 0,
};

const pos = new Set<string>([`${t.x},${t.y}`]);

const instructions: [string, number][] = lines
  .map((line) => line.split(" "))
  .map(([dir, num]) => [dir, parseInt(num)]);

// instructions.forEach(([direction, num]) => {
for (const [direction, num] of instructions) {
  //   const [direction, num] = line.split(" ");
  //   for (let i = 0; i < num; i++) {
  for (let _ = 0; _ < num; _++) {
    switch (direction) {
      case "R":
        h.x++;
        break;
      case "U":
        h.y++;
        break;
      case "L":
        h.x--;
        break;
      case "D":
        h.y--;
        break;
    }

    const x = h.x - t.x;
    const y = h.y - t.y;

    // If the head is ever two steps directly up, down, left, or right from the tail,
    // the tail must also move one step in that direction so it remains close enough:
    if (Math.abs(x) > 1 || Math.abs(y) > 1) {
      t.x += x === 0 ? 0 : x / Math.abs(x);
      t.y += y === 0 ? 0 : y / Math.abs(y);
    }

    pos.add(`${t.x},${t.y}`);
  }

  console.log("-----------------");
}

// console.log("tail", t);
console.log(pos);

// How many positions does the tail of the rope visit at least once?
// result = up + right - 1;

result = pos.size;

console.log("result:", result);
console.assert(expected === result);

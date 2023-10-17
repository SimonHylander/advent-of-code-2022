export {};

const filename = "./day7.txt";
// const filename = "./day7_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const lines = input.split("\n");

const expected = 95437;
let result = 0;

type Dir = {
  parent?: Dir;
  files: { [name: string]: number };
  dirs: { [name: string]: number };
};

const fs: Dir = { files: {}, dirs: {} };

let current = fs;

const totalAvailableDiskSpace = 70000000;
const updateDiskSpace = 30000000;

for (const command of lines) {
  const [cmd, ...rest] = command.split(" ");

  if (cmd === "$") {
    if (rest[0] === "cd") {
      const dir = rest[1];
      if (dir === "..") {
        current = current.parent!;
      } else if (dir === "/") {
        current = fs;
      } else {
        if (!current.dirs[dir]) {
          current.dirs[dir] = { parent: current, files: {}, dirs: {} };
        }
        current = current.dirs[dir];
      }
    }
  } else if (cmd !== "dir") {
    current.files[rest[0]] = parseInt(cmd);
  }
}

const dirSizes: number[] = [];

const computeFileSize = (curr: Dir): number => {
  let size = 0;

  for (const file in curr.files) {
    size += curr.files[file];
  }

  for (const dir in curr.dirs) {
    const dirSize = computeFileSize(curr.dirs[dir]);
    size += dirSize;

    dirSizes.push(dirSize);
  }

  return size;
};

const usedDiskSpace = computeFileSize(fs);

const amountToDelete = totalAvailableDiskSpace - usedDiskSpace;

result = dirSizes.filter((d) => d >= updateDiskSpace - amountToDelete)
  .reduce((total, num) => Math.min(total, num));

console.log("result:", result);
console.assert(expected === result);

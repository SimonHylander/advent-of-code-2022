export {};

// const filename = "./day7.txt";
const filename = "./day7_test.txt";

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

computeFileSize(fs);

dirSizes.forEach((a, i) => {
  if (a <= 100000) {
    result += a;
  }
});

const sumOfSub100k = dirSizes
  .reduce((a, b) => a + b);

result = sumOfSub100k;

/*
let lastCommand = "";
let directories: string[] = [];
let workingDirectory = "";
const directorySize = new Map<string, number[]>();

lines.forEach((line, i) => {
  const command = line.substring(0, line.lastIndexOf(" "));
  const argument = line.substring(4).trim();

  if (command === '$ cd') {
    if (argument === "..") {
        workingDirectory = workingDirectory.substring(0, workingDirectory.lastIndexOf("-"));
    } else {
        workingDirectory += "-" + argument
    }
  } else if (command === 'dir') {

  } else if (!isNaN(+command)) {
    const size = parseInt(command);
    if (directorySize.has(workingDirectory)) {
        // @ts-ignore xd
        const ex = [...directorySize.get(workingDirectory)]
        ex.push(size)
        directorySize.set(workingDirectory, ex);
    } else {
        directorySize.set(workingDirectory, [size]);
    }
  }
});

directorySize.forEach((a, key) => {
    const parent = key.substring(0, key.lastIndexOf("-"));
    console.log(key, parent);

    if (directorySize.has(parent)) {
        // console.log(key)
        const ex = directorySize.get(parent);

        if (ex) {
            // console.log(ex, 'add ', a);
            const newArr = ex.concat(a);
            // console.log(newArr);
            directorySize.set(parent, newArr)
        }
    }
});

console.log(directorySize);

// console.log(directorySize);
let total = 0;
directorySize.forEach((value, key) => {
    const sum = value.reduce((acc, v) => acc + v, 0);

    if (sum <= 100000) {
        console.log(sum);
        total += sum;
    }
})

console.log(total); */

/* directorySize.set(
  "/",
  Array.from(directorySize).flatMap((a) => a[1]).reduce((a, b) => a + b, 0),
); */

// const total = Array.from(directorySize).flatMap((a) => a[1]).filter(size => size <= 100000);
// .flatMap((a) => a[1]).reduce((total, value) => value <= 1000000 ? total + value : total, 0);
// console.log(total);

/* total.forEach(item => {
    result += item
}) */

console.log("result:", result);
console.assert(expected === result);

/*
  const first = output[0];
  if (first === "$") {
    const command = output[1];

    if (command === "cd") {
      const argument = output[2];

      if (argument === "..") {
        workingDirectory = workingDirectory.split("/").slice(0, -1).join("/");
        if (workingDirectory.length === 0) {
          workingDirectory = "/";
        }
      } else {
        if (workingDirectory.length === 0) {
          workingDirectory += argument;
        } else if (workingDirectory.slice(-1) === "/") {
          workingDirectory += argument;
        } else {
          workingDirectory += "/" + argument;
        }
      }
    }

    lastCommand = command;
  } else if (Number.isInteger(parseInt(first))) {
    if (lastCommand === "ls") {
      const size = output[0];

      if (directorySize.has(workingDirectory)) {
        directorySize.set(
          workingDirectory,
          // @ts-ignore xd
          directorySize.get(workingDirectory) + parseInt(size),
        );
      } else {
        directorySize.set(workingDirectory, parseInt(size));
      }
    }
  } */

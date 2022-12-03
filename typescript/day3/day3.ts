import * as p from "https://deno.land/std@0.165.0/path/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

// const input = await Deno.readTextFile("./day3_test.txt");
const input = await Deno.readTextFile("./day3.txt");
const lines = input.split("\n");

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const args = parse(Deno.args);

if (args?.p) {
  if (args?.p === "a") {
    partA();
  }

  if (args?.p === "b") {
    partB();
  }
} else {
  partA();
  partB();
}

function partA() {
  console.log("---- A ----");

  let sum = 0;

  lines.forEach((line) => {
    const firstCompartment = line.slice(0, line.length / 2);
    const secondCompartment = line.slice(line.length / 2);

    const commonLetters = firstCompartment.split("").filter((letter) => {
      return secondCompartment.includes(letter);
    });

    const priority = alphabet.indexOf(commonLetters[0]) + 1;
    sum += priority;
  });

  console.log(sum);
}

function partB() {
  console.log("---- B ----");
  let sum = 0;

  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const groupMap = new Map<number, string[]>();

  let counter = 0;
  for (let i = 0; i < lines.length; i += 3) {
    if (groupMap.has(counter)) {
      groupMap.get(counter).push(lines[i]);
      groupMap.get(counter).push(lines[i + 1]);
      groupMap.get(counter).push(lines[i + 2]);
    } else {
      groupMap.set(counter, [
        lines[i],
        lines[i + 1],
        lines[i + 2],
      ]);
    }

    counter++;
  }

  groupMap.forEach((items, i) => {
    const commonLetters = items[0].split("").filter((letter) => {
      return items[1].includes(letter) && items[2].includes(letter);
    });

    const priority = alphabet.indexOf(commonLetters[0]) + 1;
    sum += priority;
  });

  console.log(sum);
}

export { partA, partB };

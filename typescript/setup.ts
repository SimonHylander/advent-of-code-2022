import { parse } from "https://deno.land/std/flags/mod.ts";
import { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";

const args = parse(Deno.args);

const day = args?.d ?? format(new Date(), "d");
console.log(`Creating files for day ${day}`);

const dir = `day${day}`;

const encoder = new TextEncoder();

await Deno.mkdir(dir);
await Deno.create(`./${dir}/day${day}_test.txt`);
await Deno.create(`./${dir}/day${day}.txt`);

await createFile(day, "a");
await createFile(day, "b");

async function createFile(day: number, part: string) {
  await Deno.writeFile(
    `./${dir}/day${day}_${part}.ts`,
    encoder.encode(
      `export {};

const input = await Deno.readTextFile(new URL("./day${day}.txt", import.meta.url)).then(input => input.split("\\n"));

const expected = 0;
let result = 0;

input.forEach((line) => {

});

console.log("result:", result);
console.assert(expected === result);
`,
    ),
  );
}

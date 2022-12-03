
export {};

const input = await Deno.readTextFile("./day4.txt").then(input => input.split("\n"));

const expected = 0;
let result = 0;

input.forEach((line) => {

});

console.log("result:", result);
console.assert(expected === result);

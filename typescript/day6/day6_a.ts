export {};

const filename = "./day6.txt";
// const filename = "./day6_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const expected = 0;
let result = 0;



for (let i = 0; i < input.length; i++) {
    let lastFour = input.slice(i - 4, i);
    const lastFourArr = lastFour.split("");
    const lastFourSet = new Set(lastFourArr);

    if (lastFourSet.size === 4) {
        result = i;
        break;
    }
}

console.log("result:", result);
console.assert(expected === result);
export {};

const filename = "./day6.txt";
// const filename = "./day6_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const expected = 0;
let result = 0;

var startTime = performance.now()

const c = input.split("")
.map((char, i) => 
    new Set(input.slice(i, - 14, i)
    .split(""))
).filter((set) => set.size === 14)
.firstIndex();

    console.log(c);
    

/* for (let i = 0; i < input.length; i++) {
    let lastFour = input.slice(i - 14, i);
    const lastFourArr = lastFour.split("");
    const lastFourSet = new Set(lastFourArr);

    if (lastFourSet.size === 14) {
        result = i;
        break;
    }
} */

console.log("result:", result);
console.assert(expected === result);

var endTime = performance.now()
console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)



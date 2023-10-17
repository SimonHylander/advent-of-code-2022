export {};

// const filename = "./day11.txt";
const filename = "./day11_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const lines = input.split("\n");

const expected = 0;
let result = 0;

type Monkey = {
  id: number;
  startingItems: number[];
  operation: (x: number) => number;
  condition: (x: number) => number;
};

// const monkeys = new Map<number, Monkey>();
const monkeys: Monkey[] = [];

lines.forEach((line, i) => {
  if (line.startsWith("Monkey")) {
    const [_, monkeyNumber] = line.split(" ");
    const number = parseInt(monkeyNumber.substring(0, monkeyNumber.length - 1));
    const monkeyLines = lines.slice(i + 1, i + 6);

    const startingItems = monkeyLines[0].split(" ").map((x) => parseInt(x))
      .filter((x) => !isNaN(x));

    let test = monkeyLines[2].trim();
    test = test.substring("Test: ".length);
    const divisableTest = +test.substring(
      "divisible by ".length,
    );

    let trueCondition = monkeyLines[3].trim();
    trueCondition = trueCondition.substring(
      "If true: ".length,
    );

    let falseCondition = monkeyLines[4].trim();
    falseCondition = falseCondition.substring(
      "If false: ".length,
    );

    const monkey = {
      id: number,
      startingItems,
      operation: function (worryLevel: number) {
        const [op, amount] = monkeyLines[1].trim()
          .substring("Operation: new = ".length)
          .trim()
          .split(" ");

        console.log(op);
        console.log(amount);

        const actualAmount = amount === "old" ? worryLevel : parseInt(amount);

        if (op === "+") return worryLevel + actualAmount;
        if (op === "*") return worryLevel * actualAmount;

        // return parseInt(eval(op.replaceAll("old", worryLevel.toString())));
        return 0;
      },
      condition: (worryLevel: number) => {
        if (worryLevel % divisableTest === 0) {
          return +trueCondition.substring(
            "throw to monkey ".length,
          ).trim();
        }

        return +falseCondition.substring(
          "throw to monkey ".length,
        ).trim();
      },
    } as Monkey;

    monkeys.push(monkey);
  }
});

// console.log(monkeys);

const monkeyCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let rounds = 0;

while (rounds < 20) {
  rounds++;
  monkeys.forEach((monkey) => {
    while (monkey.startingItems.length > 1) {
      monkeyCounts[monkey.id]++;
      const worryLevel = monkey.startingItems.shift()!;
      const newWorryLevel = Math.floor(monkey.operation(worryLevel) / 3);
      const nextMonkey = monkey.condition(newWorryLevel);
      monkeys[nextMonkey].startingItems.push(newWorryLevel);
    }
  });
}

console.log(monkeyCounts);

const sort = monkeyCounts.sort((a, b) => b - a);

// console.log(sort[0] * sort[1]);

result = sort[0] * sort[1];

console.log("result:", result);
console.assert(expected === result);

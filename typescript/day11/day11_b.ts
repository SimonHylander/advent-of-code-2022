export {};

const filename = "./day11.txt";
// const filename = "./day11_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const groups = input.split("\n\n");

console.log(groups);

type Monkey = {
  id: number;
  items: number[];
  operation: (worry: number) => number;
  condition: (worry: number) => number;
  divisor: number;
};

const monkeys = groups.map((group, index) => {
  const lines = group.split("\n");
  const monkey: Monkey = {
    id: index,
    items: lines[1]
      .replace("  Starting items: ", "")
      .split(", ")
      .map((i) => parseInt(i)),

    operation: (worry: number) => {
      const [op, amount] = lines[2]
        .replace("  Operation: new = old ", "")
        .split(" ");

      const parsedAmount = amount === "old" ? worry : parseInt(amount);

      if (op === "+") return worry + parsedAmount;
      if (op === "*") return worry * parsedAmount;
      throw new Error("Invalid operation");
    },
    condition: (worry: number) => {
      const trueMonkey = parseInt(
        lines[4].replace("    If true: throw to monkey ", ""),
      );
      const falseMonkey = parseInt(
        lines[5].replace("    If false: throw to monkey ", ""),
      );
      const divisor = parseInt(lines[3].replace("  Test: divisible by ", ""));
      if (worry % divisor === 0) return trueMonkey;
      return falseMonkey;
    },

    divisor: parseInt(lines[3].replace("  Test: divisible by ", "")),
  };
  return monkey;
});

let rounds = 0;

const monkeyCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const globalMod = monkeys.reduce((a, b) => a * b.divisor, 1);

while (rounds < 10000) {
  // console.log(monkeys);
  rounds++;
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      monkeyCounts[monkey.id]++;
      const worry = monkey.items.shift()!;
      const newWorry = monkey.operation(worry) % globalMod;

      const nextMonkey = monkey.condition(newWorry);
      monkeys[nextMonkey].items.push(newWorry);
    }
  });
}

console.log(monkeyCounts);

const sort = monkeyCounts.sort((a, b) => b - a);

console.log(sort[0] * sort[1]);

export {};

// const filename = "../day12/day12.txt";
const filename = "./day13_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const pairOfPackets = input.split("\n\n");

const compare = (leftItems: any[], rightItems: any[]) => {
  for (let i = 0; i < leftItems.length; i++) {
    const left = leftItems[i];
    const right = rightItems[i];

    if (Number.isInteger(left) && Number.isInteger(right)) {
      if (left > right) return false;
      if (left < right) return true;
      return undefined;
    } else if (Array.isArray(left) && Array.isArray(right)) {
      for (let x = 0; x < left.length; x++) {
        const c = compare(left[x], right[x]);

        if (c !== undefined) {
          return c;
        }
      }
    } else {
      const l = typeof left === "number" ? [left] : left;
      const r = typeof right === "number" ? [right] : right;
      return compare(l, r);
    }
  }

  return false;
};

let result = 0;

pairOfPackets.forEach((pair, i) => {
  const [left, right] = pair.split("\n");
  const leftp = JSON.parse(left);
  const rightp = JSON.parse(right);

  const inOrder = compare(leftp, rightp);

  result++;
  if (inOrder) {
    result += 1;
  }
});

console.log(result);

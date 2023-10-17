export {};

/*
A queue that can be of type T
Generics are great in any language
*/
class Queue<T> {
  private items: QueueNode[] = [];
  /* Add and pop do the same thing
    One has the fat arrow syntax
    */
  public add = (item: QueueNode) => this.items.push(item);

  public pop(): QueueNode {
    return this.items.shift();
  }

  public peek(): QueueNode {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length == 0;
  }
}

class QueueNode {
  pt: Cell;
  dist: number;

  constructor(pt: Cell, dist: number) {
    this.pt = pt;
    this.dist = dist;
  }
}

/*
function checkWords(words: Set<string>, start: string, target: string) {
  if (!words.has(start) || !words.has(target)) return null;

  const queue: string[][] = [];
  const path: string[] = [];

  path.push(start);
  queue.push(path);
  words.delete(start);

  while (queue.length) {
    const lastPath = queue.shift();
    const lastWord = lastPath[lastPath.length - 1];

    if (target == lastWord) return lastPath;

    for (let item of words) {
      if (differByOne(item, lastWord)) {
        const newPath = [...lastPath];
        newPath.push(item);
        queue.push(newPath);
        words.delete(item);
      }
    }
  }

  return null;
}

function differByOne(word, target) {
  if (word.length !== target.length) return false;
  let diffCount = 0;

  for (let i = 0; i < word.length; i++) {
    if (target.charAt(i) !== word.charAt(i)) {
      diffCount++;
    }
  }

  return diffCount === 1;
} */

// const filename = "./day12.txt";
const filename = "./day12_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

const grid = input.split("\n")
  .map((x) => x.split(""));

type Cell = {
  x: number;
  y: number;
};

let start = { x: 0, y: 0 };
let end = { x: 0, y: 0 };

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const oga = grid[y][x];

    if (oga === "S") {
      start.x = x;
      start.y = y;
    }

    if (oga === "E") {
      end.x = x;
      end.y = y;
    }
  }
}

const letterToNumber = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,

  S: 1,
  E: 26,
};

const numberGrid = grid.map((row) =>
  row.map((tile) => letterToNumber[tile as keyof typeof letterToNumber])
);

const queue = {};

const rowNum: number[] = [-1, 0, 0, 1];
const colNum: number[] = [0, -1, 1, 0];

const checkValid = (row: number, col: number) => {
  return ((row >= 0) && (row < 5) && (col >= 0) && (col < 5));
};

const bfs = (mat: number[][], src: Cell, dst: Cell): number => {
  console.log(mat[dst.x]);
  //   console.log(src);
  //   console.log(dst);

  // Checking if source and destination cell have value 1
  if (mat[src.x][src.y] != 1 || mat[dst.x][dst.y] != 1) {
    return -1;
  }

  const visited: boolean[][] = [];

  // Mark the source cell as visited
  visited[src.x][src.y] = true;

  const queue = new Queue();
  // Distance of source cell is 0
  const s = new QueueNode(src, 0);
  queue.add(s); // Enqueue source cell

  while (!queue.isEmpty()) {
    const curr: QueueNode = queue.peek();
    const pt = curr.pt;

    if (pt.x == dst.x && pt.y == dst.y) {
      return curr.dist;
    }

    queue.pop();

    for (let i = 0; i < 4; i++) {
      const row = pt.x + rowNum[i];
      const col = pt.y + colNum[i];

      // Enqueue valid adjacent cell that is not visited
      if (
        checkValid(row, col) &&
        mat[row][col] == 1 &&
        !visited[row][col]
      ) {
        visited[row][col] = true;
        const Adjcell = new QueueNode(
          { y: row, x: col } as Cell,
          curr.dist + 1,
        );
        queue.add(Adjcell);
      }
    }
  }

  return -1;
};

// console.log(numberGrid);
const dist = bfs(numberGrid, start, end);
// console.log(dist);

/* let queue;
let graphAdj;
let visited;

const initGraph = (maxVertice) => {
  visited = new Array(maxVertice);
  //    stack = new Stack();
  queue = new Queue();
  for (let i = 0; i < visited.length; i++) {
    visited[i] = false;
  }
  graphAdj = new Array(maxVertice);
  for (let i = 0; i < graphAdj.length; i++) {
    graphAdj[i] = new Array(maxVertice);
  }
  for (let i = 0; i < graphAdj.length; i++) {
    for (let j = 0; j < graphAdj[i].length; j++) {
      graphAdj[i][j] = 0;
    }
  }
};

const bfs = (node) => {
  visited[node] = true;
  queue.equeue(node);
  while (!queue.isEmpty()) {
    let visiting = queue.dequeue();
    console.log(`we visited ${visiting}`);
    for (let j = 0; j < graphAdj[visiting].length; j++) {
      if ((graphAdj[visiting][j] === 1) && (visited[j] === false)) {
        visited[j] = true;
        queue.equeue(j);
      }
    }
  }
};

initGraph(grid.length); */

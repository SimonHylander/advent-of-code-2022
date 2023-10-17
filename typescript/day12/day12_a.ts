export {};

// const filename = "./day12.txt";
const filename = "./day12_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));

// const lines = input.split("\n");

const expected = 0;
let result = 0;

console.log(input);

const letters = input.split("").map((x, i) => +i);
console.log(letters);

const e = input.indexOf("E");
console.log(e);

const b = new BFSGraph();
b.adj = [1, 2, 3, 4, 5];

const b2 = new BFS();
b2.bfs(b, 0);

console.log("result:", result);
console.assert(expected === result);

class BFS {
  public bfs(G: BFSGraph, startVert: number) {
    let visited: boolean[] = Array<boolean>();
    // Pre-populate array:
    for (let i = 0; i < G.size; i++) {
      visited.push(false);
    }

    // Use an array as our queue representation:
    let q: number[] = new Array<number>();

    visited[startVert] = true;

    q.push(startVert);

    while (q.length > 0) {
      const v = q.shift();
      for (let adjV of G.adj[v]) {
        if (!visited[adjV]) {
          visited[adjV] = true;
          q.push(adjV);
        }
      }
    }
  }
}

class BFSGraph {
  public adj: Array<number>[];
  public size: number;
}

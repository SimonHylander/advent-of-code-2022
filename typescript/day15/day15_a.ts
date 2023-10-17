export {};

const filename = "./day15.txt";
// const filename = "./day15_test.txt";

const input = await Deno.readTextFile(new URL(filename, import.meta.url));
const lines = input.split("\n");

const expected = 0;
let result = 0;

type Sensor = {
  sx: number;
  sy: number;
  bx: number;
  by: number;
};

const sensors = lines.map((line) => {
  const [sensor, beacon] = line.split(":");
  const [_s, sensorX, sensorY] = sensor.match(/x=(-?\d+), y=(-?\d+)/);
  const [_b, beaconX, beaconY] = beacon.match(/x=(-?\d+), y=(-?\d+)/);

  return {
    sx: +sensorX,
    sy: +sensorY,
    bx: beaconX,
    by: beaconY,
  };
});

const options = new Set();

for (let i = 0; i < sensors.length; i++) {
  const { sx, sy, bx, by } = sensors[i];
  const distance = Math.abs(sx - bx) + Math.abs(sy - by);

  for (let x = sx - distance; x <= sx + distance; x++) {
    if (bx !== x || by !== 2000000) options.add(x);
  }
}

console.log(options.size);

// console.log("result:", result);
// console.assert(expected === result);

class Solution {
  /**
   * @param {number} target
   * @param {number[]} position
   * @param {number[]} speed
   * @return {number}
   */
  carFleet(target: number, position: number[], speed: number[]): number {
    const cars: [number, number][] = [];
    for (let i = 0; i < position.length; i++) {
      cars.push([position[i], (target - position[i]) / speed[i]]);
    }
    cars.sort((a, b) => b[0] - a[0]);
    let fleet = 0;
    let currentMaxTime = 0;

    for (let [_, time] of cars) {
      if (time > currentMaxTime) {
        fleet++;
        currentMaxTime = time;
      }
    }
    return fleet;
  }
}

const f = new Solution();
console.log(f.carFleet(12, [10, 0], [2, 12]));

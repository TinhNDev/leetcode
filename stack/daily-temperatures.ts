class Solution {
  /**
   * @param {number[]} temperatures
   * @return {number[]}
   */
  dailyTemperatures(temperatures: number[]): number[] {
    const stack: number[] = [];
    let count = 0;
    for (let index = 0; index < temperatures.length; index++) {
      let isHasPointer = false;
      for (let i = index + 1; i < temperatures.length; i++) {
        if (temperatures[index] >= temperatures[i]) {
          count++;
        } else {
          count++;
          isHasPointer = true;
          break;
        }
      }
      if (isHasPointer) {
        stack.push(count);
        count = 0;
        isHasPointer = false;
      } else {
        stack.push(0);
        count = 0;
        isHasPointer = false;
      }
    }

    return stack;
  }

  dailyTemperatures1(temperatures: number[]): number[] {
    const rs = Array(temperatures.length).fill(0);
    const stack: [number, number][] = [];

    temperatures.forEach((temp, index, arr) => {
      while (stack.length > 0 && temp > stack[stack.length - 1][0]) {
        const [tempS, indexS] = stack.pop()!;
        rs[indexS] = index - indexS;
      }
      stack.push([temp, index]);
    });
    return rs;
  }
}

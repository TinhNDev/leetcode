class Solution {
  twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
      const sum = numbers[right] + numbers[left];

      if (sum === target) {
        return [left + 1, right + 1];
      }
      if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
    return [];
  }
}

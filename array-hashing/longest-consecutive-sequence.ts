class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  // hash set
  longestConsecutive(nums: number[]): number {
    let set = new Set(nums);
    let maxLength = 0;
    for (let num of nums) {
      if (!set.has(num - 1)) {
        let length = 0;
        while (set.has(num + 1)) {
          length++;
        }
        maxLength = Math.max(length, maxLength);
      }
    }
    return maxLength;
  }

  //sort
  longestConseutive1(nums: number[]): number {
    if (nums.length === 0) return 0;
    const arr = nums.sort((a, b) => a - b);
    let curr = arr[0];
    let streak = 0;
    let i = 0;
    let maxLength = 0;
    while (i < arr.length) {
      if (arr[i] !== curr) {
        curr = arr[i];
        streak = 0;
      }
      while (i < arr.length && arr[i] === curr) {
        i++;
      }
      streak++;
      curr++;
      maxLength = Math.max(streak, maxLength);
    }
    return maxLength;
  }
}

class Solution {
  /**
   * @param {number[]} nums
   * @return {boolean}
   */
  //brute force
  hasDuplicate1(nums: number[]): boolean {
    for (let i = 0; i <= nums.length - 1; i++) {
      for (let j = i + 1; j <= nums.length - 1; j++) {
        if (nums[i] == nums[j]) {
          return true;
        }
      }
    }
    return false;
  }
  //Set
  hasDuplicate2(nums: number[]): boolean {
    return nums.length !== new Set(nums).size;
  }
}

class Solution {
  /**
   * @param {number[]} heights
   * @return {number}
   */
  maxArea(heights: number[]): number {
    let s = 0;
    let left = 0;
    let right = heights.length - 1;
    while (left < right) {
      const area = (right - left) * Math.min(heights[left], heights[right]);

      s = Math.max(s, area);
      if (heights[left] < heights[right]) {
        left++;
      } else right--;
    }
    return s;
  }
}

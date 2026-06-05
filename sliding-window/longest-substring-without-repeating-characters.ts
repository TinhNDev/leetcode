class Solution {
  /**
   * @param {string} s
   * @return {number}
   */
  lengthOfLongestSubstring(s: string): number {
    let left = 0;
    let rs = 0;
    const set = new Set();

    for (let index = 0; index < s.length; index++) {
      while (set.has(s[index])) {
        set.delete(s[left]);
        left++;
      }

      set.add(s[index]);
      rs = Math.max(rs, index - left + 1);
    }
    return rs;
  }
}

class Solution {
  /**
   * @param {string} s
   * @return {boolean}
   */
  isValid(s: string): boolean {
    const stack: string[] = [];
    const map: Record<string, string> = {
      "}": "{",
      ")": "(",
      "]": "[",
    };
    for (let i of s) {
      if (i === "[" || i === "{" || i === "(") {
        stack.push(i);
      } else if (stack.pop() !== map[i]) {
        return false;
      }
    }
    return stack.length === 0;
  }
}

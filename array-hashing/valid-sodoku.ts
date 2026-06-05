class Solution {
  /**
   * @param {character[][]} board
   * @return {boolean}
   */
  isValidSudoku(board: string[][]): boolean {
    for (let i = 0; i < 9; i++) {
      let set = new Set();
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === ".") continue;
        if (set.has(board[i][j])) return false;
        set.add(board[i][j]);
      }
    }

    for (let i = 0; i < 9; i++) {
      let set = new Set();
      for (let j = 0; j < 9; j++) {
        if (board[j][i] === ".") continue;
        if (set.has(board[j][i])) return false;
        set.add(board[j][i]);
      }
    }

    for (let s = 0; s < 9; s++) {
      let seen = new Set();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let row = Math.floor(s / 3) * 3 + i;
          let col = (s % 3) * 3 + j;
          if (board[row][col] === ".") continue;
          if (seen.has(board[row][col])) return false;
          seen.add(board[row][col]);
        }
      }
    }
    return true;
  }
}

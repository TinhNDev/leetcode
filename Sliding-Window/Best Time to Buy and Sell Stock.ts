class Solution {
  /**
   * @param {number[]} prices
   * @return {number}
   */
  maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (const price of prices) {
      minPrice = Math.min(minPrice, price);

      maxProfit = Math.max(maxProfit, price - minPrice);
    }

    return maxProfit;
  }
}

class Solution {
    /**
     * @param {number[]} nums
     * @return {number[]}
     */
    productExceptSelf(nums: number[]): number[] {
        let res = [];
        let product = 1;
        let zeroNumbers = 0;
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] === 0) {
                zeroNumbers += 1
                continue;
            }
            product = nums[i] * product;
        }

        for (let i = 0; i < nums.length; i++) {
            if (zeroNumbers === 0) {
                res.push(product / nums[i])
                continue;
            }
            if (zeroNumbers === 1) {
                if (nums[i] === 0) res.push(product)
                else res.push(0)
                continue;
            }
            if (zeroNumbers > 1) res.push(0)
        }

        return res;
    }

    productExceptSelf1(nums: number[]): number[] {
        let res: number[] = [];
        let product = 1;
        let prefix = [];
        let postfix = [];
        for (let i = 0; i < nums.length; i++) {
            if (i === 0) {
                prefix.push(product)
                continue;
            }
            product = product * nums[i - 1]
            prefix.push(product)
        }
        product = 1;
        for (let i = nums.length - 1; i >= 0; i--) {
            if (i === nums.length - 1) {
                postfix.push(product)
                continue;
            }
            product = product * nums[i + 1]
            postfix.push(product)
        }
        for (let index = 0; index < nums.length; index++) {
            res.push(prefix[index] * postfix[nums.length - 1 -index])
        }
        return res;
    }
}

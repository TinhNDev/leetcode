class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    /**
     * 
     * @solution brute force 
     * @timecomplexity O(n^2)
     * @spacecomplexity O(1)
     */
    twoSum1(nums: number[], target: number): number[] {
        for(let i = 0; i <= nums.length - 1; i++){
        for(let j = i+1; j <= nums.length - 1; j++){
                if(nums[i]+ nums[j] === target) return [i,j]
            }
        }
        return []
    }
    /**
     * 
     * @solution hash map 
     * @timecomplexity O(n^2)
     * @spacecomplexity O(1)
     */
    
    twoSum2(nums: number[], target: number): number[] {
        const map = new Map()
        for(const [index, value] of nums.entries()){
            const x = target - value;
            if(map.has(x)){
                return [index,map.get(x)]
            }
            map.set(value,index)
        }
        
        return []
    }
}

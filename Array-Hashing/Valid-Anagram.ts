class Solution {
    /**
     * @param {string} s
     * @param {string} t
     * @return {boolean}
     */
    /*
    solution: sort
    time and space complexity: O(n log n) and O(n)
    */
    isAnagram1(s: string, t: string): boolean {
        return Array.from(s).sort().join('') === Array.from(t).sort().join('')
    }

    /*
    solution: hashmap
    time and space complexity: O(n log n) and O(n)
    */
    isAnagram2(s: string, t: string): boolean {
        if(s.length !== t.length) return false
        const map = new Map();
        for(const arr of s) {
            map.set(arr, (map.get(arr) || 0)+ 1)
        }
        for(const arr of t){
            if(map.has(arr)){
                const value = map.get(arr) - 1
                if (value === 0){
                    map.delete(arr)
                } else map.set(arr, map.get(arr) - 1)
            } else return false

        }
        return true;
    }
    
}

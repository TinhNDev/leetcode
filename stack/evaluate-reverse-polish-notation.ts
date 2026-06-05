class Solution {
  evalRPN(tokens: string[]): number {
    const stack: number[] = [];

    for (const t of tokens) {
      if (t === "+" || t === "-" || t === "*" || t === "/") {
        const a = stack.pop()!;
        const b = stack.pop()!;

        if (t === "+") stack.push(b + a);
        else if (t === "-") stack.push(b - a);
        else if (t === "*") stack.push(b * a);
        else stack.push(Math.trunc(b / a));
      } else {
        stack.push(Number(t));
      }
    }

    return stack[0];
  }
}

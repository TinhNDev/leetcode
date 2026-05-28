class MinStack {
  private stack: number[];
  private stack2: number[];
  constructor() {
    this.stack = [];
    this.stack2 = [];
  }

  /**
   * @param {number} val
   * @return {void}
   */
  push(val: number): void {
    if (this.stack.length === 0) {
      this.stack.push(val);
      this.stack2.push(val);
    } else {
      this.stack.push(val);
      if (
        this.stack[this.stack.length - 1] <= this.stack2[this.stack2.length - 1]
      ) {
        this.stack2.push(val);
      }
    }
  }

  /**
   * @return {void}
   */
  pop(): void {
    if (this.stack.length === 0) return;
    const x = this.stack.pop();
    const y = this.stack2[this.stack2.length - 1];
    if (x === y) {
      this.stack2.pop();
    }
  }

  /**
   * @return {number}
   */
  top(): number {
    return this.stack[this.stack.length - 1];
  }

  /**
   * @return {number}
   */
  getMin(): number {
    return this.stack2[this.stack2.length - 1];
  }
}

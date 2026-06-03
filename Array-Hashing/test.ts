class test1 {
  private x: string;
  y: number;
  constructor(z: string, b: number) {
    this.x = z;
    this.y = b;
  }
}
const test12 = new test1("x", 1);
test12.y = 123;
console.log(test12);

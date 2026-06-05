class test1 {
  private x: string;
  y: number;
  constructor(z: string, b: number) {
    this.x = z;
    this.y = b;
  }
}
const test12 = new test1("x", 1);
class test2 implements test {
  hello(): void {
    console.log("123");
  }
}

class test3 implements test {
  hello(): void {
    console.log("345");
  }
}
interface test {
  hello(): void;
}

class testImplement {
  constructor(test: test) {}
}
const z = new test2();
let x = new testImplement(z);
test12.y = 123;
console.log(test12);

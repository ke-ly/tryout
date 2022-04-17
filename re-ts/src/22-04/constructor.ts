interface commonFn {
	(...args: any[]): any;
	a: string;
}
type Fn = (...args: any) => any;

const f1: commonFn = () => {};
f1.a = "a";

function Cons() {}
// const c1 = new Cons(); // error

class Bank {
	constructor(public name: string, public No: number) {}
}

const b1: Bank = { name: "招商", No: 622012455 };
const b2 = new Bank("中信", 6242145);

type ConstructorType<T> = new (...args: any[]) => T;

function createInstanceFactory<T>(
	Constructor: ConstructorType<T>,
	...args: any[]
) {
	console.log(`add:${Constructor.name}`);
	return new Constructor(...args);
}

const b3 = createInstanceFactory<Bank>(Bank, "建设", 608888);

console.log(b3);

export {};

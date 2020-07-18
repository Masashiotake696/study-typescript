"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ---------- 4-1 ----------
// ----- 4-1-1 -----
function getFormattedValue(value) {
    return `${value.toFixed(1)} pt`;
}
console.log(getFormattedValue(0.1)); // 0.1pt
console.log(getFormattedValue(0)); // 0.0pt
console.log(getFormattedValue(null)); // Runtime Error
function getFormattedValue2(value) {
    // return `${value.toFixed(1)} pt` // Error
}
console.log(getFormattedValue2(0.1)); // 0.1pt
console.log(getFormattedValue2(0)); // 0pt
console.log(getFormattedValue2(null)); // ??
function getFormattedValue3(value) {
    // 早期returnをガード節やType Guardと呼ぶ
    if (value === null)
        return '-- pt'; // (parameter) value: number | null
    return `${value.toFixed(1)} pt`; //(parameter) value: number
}
console.log(getFormattedValue3(0.1)); // 0.1pt
console.log(getFormattedValue3(0)); // 0pt
console.log(getFormattedValue3(null)); // -- pt
// ----- 4-1-2 -----
function greet(name) {
    return `Hello ${name}`;
}
// console.log(greet()) // Error
console.log(greet('Taro')); // Hello Taro
// ?をつけることで引数はオプションになる
function greet2(name) {
    return `Hello ${name}`;
}
console.log(greet2()); // Hello undefined
console.log(greet2('Taro')); // Hello Taro
function greet3(name) {
    // return `Hello ${name.toUpperCase()}` // Error
}
console.log(greet3()); // function greet3(name?: string | undefined): string
console.log(greet3('Taro')); // Hello Taro
function greet4(name) {
    if (name === undefined)
        return 'Hello'; // (parameter) name: string | undefined
    return `Hello ${name.toUpperCase()}`; // (parameter) name: string
}
console.log(greet4()); // Hello
console.log(greet4('Taro')); // Hello Taro
// ----- 4-1-3 -----
// この関数を利用するコードに対しては引数unitはオプションとして振る舞い、関数内部のコードからはオプションが即座に振るい落とされる
function getFormattedValue4(value, unit = 'pt') {
    return `${value.toFixed(1)} ${unit.toUpperCase()}`; // (parameter) unit: string
}
console.log(getFormattedValue4(100)); // 100.0 PT
console.log(getFormattedValue4(100, 'kg')); // 100.0 KG
// console.log(getFormattedValue4(100, 0)) // Error
function getFormattedValue5(value, unit = null) {
    // return `${value.toFixed(1)} ${unit.toUpperCase()}` // Error
}
function getFormattedValue6(value, unit = null) {
    const _value = value.toFixed(1);
    if (unit === null)
        return `${_value}`; // (parameter) unit: string | null
    return `${_value} ${unit.toUpperCase()}`; // (parameter) unit: string
}
function registerUser(user) { }
const maybeUser = {
    age: 26,
    name: 'Taro',
    gender: 'male'
};
const notUser = {
    gender: 'male',
    graduate: 'Tokyo'
};
// Weak Typeは部分的にでも一致すればTypeScriptは意図したことだと判断する
registerUser(maybeUser);
// registerUser(notUser) // Error
// オブジェクトリテラルを引数に直接記述するとエラーになる。これはExcess Property Checks(過剰なプロパティチェック)と呼ばれている
// 設定値には存在しない値に対しては過剰に検査するようになっている
// registerUser({
//   age: 26,
//   name: 'Taro',
//   gender: 'male' // Error
// })
// スプレッド演算子を使用すると変数を利用した時と同じになりコンパイルエラーは起こらない
registerUser(Object.assign({
    age: 26,
    name: 'Taro',
    gender: 'male'
}));
const state = {
    id: 1,
    name: 'Taro'
};
state.name = 'Hanako';
// Readonly型を使用するとオブジェクトの全てのプロパティがreadonlyになる
const state2 = {
    id: 1,
    name: 'Taro'
};
const state3 = {
    id: 1,
    name: 'Taro'
};
const fronzenState = Object.freeze(state3); // const fronzenState: Readonly<State3>
// fronzenState.name = 'Hanako'
// fronzenState.id = 2
// ---------- 4-2 ----------
// ----- 4-2-1 -----
const defaultTheme = {
    backgroundColor: 'orange',
    borderColor: 'red' // (property) borderColor: string
};
defaultTheme.backgroundColor = 'blue';
// 抽象的な型から詳細な型を付与（ダウンキャスト）
const defaultTheme2 = {
    backgroundColor: 'orange',
    borderColor: 'red' // (property) borderColor: "red"
};
// defaultTheme2.backgroundColor = "blue" // Error
// 互換性の無いダウンキャストはエラーになる
// const defaultTheme3 = {
//   backgroundColor: "orange" as false, // Error
//   borderColor: "red" as 0 // Error
// }
const empty = {};
const fiction = empty.value; // const fiction: "value"
// 抽象度を上げる型の付与（アップキャスト）
function toNumer(value) {
    return value;
}
const fiction2 = toNumer('1,000'); // const fiction2: number
fiction2.toFixed(); // Runtime Error (fiction2が文字列のため)
// ageプロパティは定義されていないためエラーになる
const userA = {
    name: 'Taro',
};
const userB = {
    name: 'Taro',
    age: 26,
};
const userC = {
    name: 'Taro',
    age: 26,
};
// 型が明示的なnameプロパティはstring型になる
const x = userC.name; // const x: string
const y = userC.age; // const y: string | number
const userD = {
    name: 'Taro',
    enquete: {
        exercise_habits: 'entirely',
        time_of_sleeping: 'few'
    }
};
// y2もAnswer型として推論されてしまう。
const x2 = userD.enquete['exercise_habits']; // const x2: Answer
const y2 = userD.enquete['steps_per_day']; // const y2: Answer
const userE = {
    name: 'Taro',
    enquete: {
        exercise_habits: 'entirely',
        time_of_sleeping: 'few'
    }
};
const x3 = userE.enquete['exercise_habits']; // const x3: "mighty" | "lot" | "few" | "entirely" | undefined
const y3 = userE.enquete['steps_per_day']; // const y3: "mighty" | "lot" | "few" | "entirely" | undefined
const userF = {
    name: 'Taro',
    enquete: {
        exercise_habits: 'entirely',
        time_of_sleeping: 'few'
    }
};
const x4 = userF.enquete['exercise_habits'];
const userG = {
    name: 'Taro',
    age: 28,
    walk: () => { },
    talk: () => __awaiter(void 0, void 0, void 0, function* () { })
};
const functions = {
    // name: 'Taro', // Error
    // age: 28, // Error
    walk: () => { },
    talk: () => __awaiter(void 0, void 0, void 0, function* () { })
};
const returnPromises = {
    // name: 'Taro', // Error
    // age: 28, // Error
    // walk: () => {}, // Error
    talk: () => __awaiter(void 0, void 0, void 0, function* () { })
};
// ----- 4-2-3 -----
// const assertionによるLiteral Typesの簡略化
const tuple1 = [false, 1, '2']; // const tuple1: [false, 1, "2"]
const tuple2 = [false, 1, '2']; // const tuple2: readonly [false, 1, "2"]
// Widening Literal Typesを抑止
const a = 'a'; // const a: "a"
let b = a; // let b: string
const A = 'A'; // const A: "A"
let B = A; // let B: "A"
function increment() {
    return { type: 'INCREMENT' };
}
function decrement() {
    return { type: 'DECREMENT' };
}
const inc = increment(); // const inc: { type: string }
const dec = decrement(); // const dec: { readonly type: 'DECREMENT' }
const constants_1 = __importDefault(require("./constants"));
const n = constants_1.default; // const n: { readonly increment: "INCREMENT"; readonly decrement: "DECREMENT"; readonly setCount: "SET_COUNT"; }
// ----- 4-2-4 -----
function greetA() {
    console.log('hello');
}
const message = greetA();
console.log(message.toUpperCase()); // Runtime Error (messageはvoid型のため)
// ----- 4-2-5 -----
function greetB(name) {
    // !を使用するとnullおよびundefinedの型情報のみをインラインで振り落とす。これをNon-null assertionと呼ぶ
    console.log(`Hello ${name.toUpperCase()}`); // Runtime Error
}
greetB();
// 最も抽象的なany型を付与した上で都合の良い型に書き換える方法をdouble assertionと呼ぶ
const myName = 0;
console.log(myName.toUpperCase()); // Runtime Error
// ---------- 4-3 ----------
// ----- 4-3-1 -----
function reset(value) {
    const v0 = value; // const v0: string | number | boolean
    if (typeof value === 'number') {
        const v1 = value; // const v1: number
        return 0;
    }
    const v2 = value; // const v2: string | boolean
    if (typeof value === 'string') {
        const v3 = value; // const v3: string
        return '';
    }
    const v4 = value; // const v4: boolean
    return false;
}
console.log(reset(1)); // 0
console.log(reset('1')); // ""
console.log(reset(true)); // false
function judgeUserType(user) {
    if ('gender' in user) {
        const u0 = user; // const u0: User2 | User3
        console.log('user type is User2 | User3');
    }
    if ('name' in user) {
        const u1 = user; // const u1: User2
        console.log('uesr type is User2');
        return; // 早期returnによる絞り込み推論
    }
    const u2 = user;
    console.log('user type is User3');
}
class Creature {
    breathe() { }
}
class Animal extends Creature {
    shakeTail() { }
}
class Human extends Creature {
    greet() { }
}
function action(creature) {
    const c0 = creature; // const c0: Creature | Animal | Human
    c0.breathe();
    if (creature instanceof Animal) {
        const c1 = creature; /// const c1: Animal
        return c1.shakeTail();
    }
    const c2 = creature; // const c2: Creature | Human
    if (creature instanceof Human) {
        const c3 = creature; // const c3: Human
        return c3.greet();
    }
    const c4 = creature; // const c4: Creature
    return c4.breathe();
}
function judgeUserType2(user) {
    switch (user.gender) {
        case 'male':
            const u0 = user; // const u0: UserX
            return 'user type is UserX';
        case 'female':
            const u1 = user; // const u1: UserY
            return 'user type is UserY';
        case 'other':
            const u2 = user; // const u2: UserZ
            return 'user type is UserZ';
        default:
            const u3 = user; // const u3: never
            return 'user type is never';
    }
}
function isUserM(user) {
    return user.name !== undefined;
}
function isUserN(user) {
    return user.age !== undefined;
}
function getUserType(user) {
    const u0 = user; // const u0: any
    if (isUserM(user)) {
        const u1 = user; // const u1: UserM
        return 'M';
    }
    if (isUserN(user)) {
        const u2 = user; //const u2: UserN
        return 'N';
    }
    return 'unknown';
}
const userType = getUserType({ name: 'Taro' }); // const userType: "M" | "N" | "unknown"
const users = [
    { name: 'Taro', gender: 'male' },
    { name: 'Hanako', graduate: 'Tokyo' }
];
const filteredUsers = users.filter(user => 'graduate' in user); // const filteredUsers: (UserP | UserQ)[]
const filteredUsers2 = users.filter((user) => 'graduate' in user); // const filteredUsers2: UserQ[]

// ---------- 2-1 (関数の引数と戻り値の型定義) ----------
// ----- 2-1-1 -----
// 引数に型を定義
function expo2(amount: number) {
  return amount ** 2
}
console.log(expo2(1000))
// console.log(expo2('1,000')) // Error

// ----- 2-1-2 -----
// 引数と戻り値に型を定義
function taxed(amount: number): number {
  return amount * 1.1
}

function fee(amount: number): number {
  return amount * 1.4
}

function price(amount: number): number {
  return fee(amount)
}

const demand = '¥' + taxed(price(1000))


// ---------- 2-2 (プリミティブ型 ※object型以外) ----------
// ----- 2-2-1 -----
let flag: boolean = false

// ----- 2-2-2 -----
let decimal: number = 256
let hex: number = 0xfff
let binary: number = 0b0000
let octal: number = 0o123

// ----- 2-2-3 -----
let color: string = "white"
color = 'black'
let myColor: string = `my color is ${color}`

// ----- 2-2-4 -----
// 配列型の定義は2パターン
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]

// ----- 2-2-5 -----
// tuple型
let x: [string, number]

x = ["hello", 10]
// x = [10, "hello"] // Error

console.log(x[0].substr(1))

// console.log(x[1].substr(1))  // Error
// x[3] = "world"  // Error
// console.log(x[5].toString())  // Error

// ----- 2-2-6 -----
let whatever: any = 0
whatever = "something"
whatever = false

// ----- 2-2-7 -----
// unknown型はany型のタイプセーフ対応版のようなもの。型アサーションなどがないと利用できない
// const certainlyNumbers: number[] = ['0'] // Error
const maybeNumbers: any[] = ['0']
const probablyNumbers: unknown[] = ['0']

maybeNumbers[0].toFixed(1)
// probablyNumbers[0].toFixed(1) // Error

// ----- 2-2-8 -----
// void型は型がないことを表す（undefinedのみ代入可能）。値を返さない関数の戻り型として使用する
function logger(message: string): void {
  console.log(message)
}
let unusable: void
unusable = undefined
// unusable = null // Error

// ----- 2-2-9 -----
// undefined型とnull型は単体ではあまり役に立たない。後述するUnion Typesで使用する
let u: undefined = undefined
let n: null = null

// ----- 2-2-10 -----
// never型は発生し得ない値の型を表す。戻り値がない関数の戻り型として使用する
function error(message: string): never {
  throw new Error(message)
}
function infiniteLoop(): never {
  while (true) {

  }
}

// ----- 2-2-11 -----
// object型は非プリミティブ型を表す
let objectBrace: {}
let objectType: object

objectBrace = true
objectBrace = 0
// objectType = false // Error
// objectType = 1 // Error


// ---------- 2-3 (高度な型) ----------
// ----- 2-3-1 -----
// Intersection Types (交差)。既存の型をまとめて必要な機能を全て備えた単一の型を所得できる
type Tail = {}
type Cat = {
  tail: Tail
  bark: () => void
}
type Wing = {}
type Bird = {
  wing: Wing
  fly: () => void
}
type Kimera = Cat & Bird

function returnNever(): never {
  throw new Error()
}
let unexistenceType: string & number & boolean = returnNever() // プリミティブ型のIntersection Typesはnever型として解釈される
// let problematicNumber: string & number ='0' // Error

// ----- 2-3-2 -----
// Union Types（共用体）。複数の型のうちの一つの型が成立することを示す
let value: boolean | number | string
value = false
value = 1
value = 'test'

let numberOrStrings: (number|string)[] // Array型の要素の型としても使用可能
numberOrStrings = [0, '1']
// numberOrStrings = [0, '1', false] // Error

let nullableString: string | null
nullableString = null
nullableString = 'notNull'

let nullableStrings: (string| null)[] = []
nullableStrings.push('1')
nullableStrings.push(null)
// nullableStrings.push(false) // Error

// ----- 2-3-3 -----
// Literal Types（リテラル）。正確な値を指定できる（文字列、数値、審議値など）
let myName: 'Taro'
myName = 'Taro'
// myName = 'Jiro' // Error
myName.toLowerCase() // String Literal Typesはstring型のサブタイプであるため、文字列が持つ関数にアクセスできる

let users: 'Taro' | 'Jiro' | 'Hanako' // 定数のように扱える
users = 'Hanako'

let zero: 0
zero = 0
// zero = 1 // Error
zero.toFixed(1)

let bit: 8 | 16 | 32 | 64  // Number Literal Typesはnumber型のサブタイプであるため、数値が持つ関数にアクセスできる
bit = 8
// bit = 12 // Error

let truth: true
truth = true
// truth = false // Error


// ---------- 2-4 (typeofキーワードとkeyofキーワード) ----------
// ----- 2-4-1 -----
// typeofキーワード。宣言済み変数の型を取得できる
let asString: string = ''
let string: typeof asString // string型
string = 'string'
// string = 0 // Error

let myObject = { foo: 'foo' }
let anotherObject: typeof myObject = { foo: '' } // string型のfooプロパティを持つobject型
anotherObject['foo'] = 'value'
// anotherObject['bar'] = 'value' // Error

// ----- 2-4-2 -----
// keyofキーワード。オブジェクトのプロパティ名称をString Literal Union Typesで取得できる
type someType = {
  foo: string
  bar: string
  baz: string
}
let someKey: keyof someType // 'foo' | 'bar' | 'baz' 型
someKey = 'bar'

const ownObject = {
  foo: 'FOO',
  bar: 'BAR',
  baz: 'BAZ'
}
let ownObjectKey: keyof typeof ownObject // 'foo' | 'bar' | 'baz' 型。typeof ownObjectで、string型のfooプロパティとstring型のbarプロパティとstring型のbazプロパティを持つobject型を取得。
ownObjectKey = 'bar'
// ownObjectKey = 'qux' // Error

const indexedObject = {
  0: 0,
  1: 1
}
let indexedKey: keyof typeof indexedObject
indexedKey = 0
// indexedKey = 2 // Error


// ---------- 2-5 (アサーション) ----------
// ----- 2-5-1 -----
// アサーションはダウンキャスト可能な互換性がある場合に限って、「この型である」と宣言することができ、これによりTypeScriptはプログラマーが型についてチェックを行ったと判定する。構文は2パターン
let someValue: any = "this is a string"
let strLength1: number = (<string>someValue).length // any型をstring型にダウンキャスト
let strLength2: number = (someValue as string).length // any型をstring型にダウンキャスト


// ---------- 2-6 (クラス) ----------
class Creature {
  protected numberOfHands: number
  protected numberOfFeet: number

  public constructor(numberOfHands: number, numberOfFeet: number) {
    this.numberOfHands = numberOfHands
    this.numberOfFeet = numberOfFeet
  }
}

const creature = new Creature(0, 4)

class Dog extends Creature {
  protected bark: string

  public constructor(bark: string) {
    super(0,4)
    this.bark = bark
  }

  protected barking(): string {
    return `${this.bark}! ${this.bark}!`
  }

  public shakeTail(): void {
    console.log(this.barking())
  }
}

class Human extends Creature {
  protected name: string

  public constructor(name: string) {
    super(2,2)
    this.name = name
  }

  protected greet(): string {
    return `Hello! I'm ${this.name}.`
  }

  public shakeHands(): void {
    console.log(this.greet())
  }
}

const dog = new Dog('bow-wow')
const human = new Human('')

class Taro extends Human {
  public constructor() {
    super('Taro')
  }

  public greeting() {
    console.log(this.greet())
  }
}

const taro = new Taro()

taro.greeting()
// taro.greet() // Error
taro.shakeHands()


// ---------- 2-7 (列挙型) ----------
// ----- 2-7-1 (数値列挙) -----
enum Direction {
  Up, // (enum member) Direction.Up = 0
  Down, // (enum member) Direction.Down = 1
  Left, // (enum member) Direction.Left = 2
  Right, // (enum member) Direction.Right = 3
}
const left = Direction.Left // const left: Direction.Left

// ----- 2-7-2 (文字列列挙) -----
enum Ports {
  USER_SERVICE = '8080',
  REGISTER_SERVICE = '8081',
  MEDIA_SERVICE = '8888'
}

const registerService = Ports.REGISTER_SERVICE // const registerService: Ports.REGISTER_SERVICE

// ----- 2-7-3 (open ended) -----
enum AnimalBarks {
  CAT = 'nya~nya~'
}

enum AnimalBarks {
  DOG = 'wan!wan!'
}

enum AnimalBarks {
  PIG = 'bu~bu~'
}

const catBark = AnimalBarks.CAT // const catBark: AnimalBarks.CAT

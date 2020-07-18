// ---------- 4-1 ----------
// ----- 4-1-1 -----
function getFormattedValue(value: any) {
  return `${value.toFixed(1)} pt`
}
console.log(getFormattedValue(0.1)) // 0.1pt
console.log(getFormattedValue(0)) // 0.0pt
console.log(getFormattedValue(null)) // Runtime Error

function getFormattedValue2(value: number | null) {
  // return `${value.toFixed(1)} pt` // Error
}
console.log(getFormattedValue2(0.1)) // 0.1pt
console.log(getFormattedValue2(0)) // 0pt
console.log(getFormattedValue2(null)) // ??

function getFormattedValue3(value: number | null) {
  // 早期returnをガード節やType Guardと呼ぶ
  if (value === null) return '-- pt' // (parameter) value: number | null
  return `${value.toFixed(1)} pt` //(parameter) value: number
}
console.log(getFormattedValue3(0.1)) // 0.1pt
console.log(getFormattedValue3(0)) // 0pt
console.log(getFormattedValue3(null)) // -- pt


// ----- 4-1-2 -----
function greet(name: string) {
  return `Hello ${name}`
}
// console.log(greet()) // Error
console.log(greet('Taro')) // Hello Taro

// ?をつけることで引数はオプションになる
function greet2(name?: string) {
  return `Hello ${name}`
}
console.log(greet2()) // Hello undefined
console.log(greet2('Taro')) // Hello Taro

function greet3(name?: string) {
  // return `Hello ${name.toUpperCase()}` // Error
}
console.log(greet3()) // function greet3(name?: string | undefined): string
console.log(greet3('Taro')) // Hello Taro

function greet4(name?: string) {
  if (name === undefined) return 'Hello' // (parameter) name: string | undefined
  return `Hello ${name.toUpperCase()}` // (parameter) name: string
}
console.log(greet4()) // Hello
console.log(greet4('Taro')) // Hello Taro

// ----- 4-1-3 -----
// この関数を利用するコードに対しては引数unitはオプションとして振る舞い、関数内部のコードからはオプションが即座に振るい落とされる
function getFormattedValue4(value: number, unit = 'pt') { // function getFormattedValue4(value: number, unit?: string): string
  return `${value.toFixed(1)} ${unit.toUpperCase()}` // (parameter) unit: string
}
console.log(getFormattedValue4(100)) // 100.0 PT
console.log(getFormattedValue4(100, 'kg')) // 100.0 KG
// console.log(getFormattedValue4(100, 0)) // Error

function getFormattedValue5(value: number, unit: string | null = null) {
  // return `${value.toFixed(1)} ${unit.toUpperCase()}` // Error
}
function getFormattedValue6(value: number, unit: string | null = null) {
  const _value = value.toFixed(1)
  if (unit === null) return `${_value}` // (parameter) unit: string | null
  return `${_value} ${unit.toUpperCase()}` // (parameter) unit: string
}

// ----- 4-1-4 -----
// 全てのプロパティがオプショナルな型はWeak Typeと呼ぶ
type User = {
  age?: number
  name?: string
}
function registerUser(user: User) {}

const maybeUser = {
  age: 26,
  name: 'Taro',
  gender: 'male'
}
const notUser = {
  gender: 'male',
  graduate: 'Tokyo'
}
// Weak Typeは部分的にでも一致すればTypeScriptは意図したことだと判断する
registerUser(maybeUser)
// registerUser(notUser) // Error
// オブジェクトリテラルを引数に直接記述するとエラーになる。これはExcess Property Checks(過剰なプロパティチェック)と呼ばれている
// 設定値には存在しない値に対しては過剰に検査するようになっている
// registerUser({
//   age: 26,
//   name: 'Taro',
//   gender: 'male' // Error
// })
// スプレッド演算子を使用すると変数を利用した時と同じになりコンパイルエラーは起こらない
registerUser({...{
  age: 26,
  name: 'Taro',
  gender: 'male'
}})

// ----- 4-1-5 -----
type State = {
  readonly id: number // 読み込み専用
  name: string
}
const state: State = {
  id: 1,
  name: 'Taro'
}
state.name = 'Hanako'
// state.id = 2 // Error

type State2 = {
  id: number
  name: string
}
// Readonly型を使用するとオブジェクトの全てのプロパティがreadonlyになる
const state2: Readonly<State> = {
  id: 1,
  name: 'Taro'
}
// state2.name = 'Hanako' // Error
// state2.id = 2 // Error

type State3 = {
  id: number
  name: string
}
const state3: State3 = {
  id: 1,
  name: 'Taro'
}
const fronzenState = Object.freeze(state3) // const fronzenState: Readonly<State3>
// fronzenState.name = 'Hanako'
// fronzenState.id = 2

// ---------- 4-2 ----------
// ----- 4-2-1 -----
const defaultTheme = {
  backgroundColor: 'orange', // (property) backgroundColor: string
  borderColor: 'red' // (property) borderColor: string
}
defaultTheme.backgroundColor = 'blue'

// 抽象的な型から詳細な型を付与（ダウンキャスト）
const defaultTheme2 = {
  backgroundColor: 'orange' as 'orange', // (property) backgroundColor: "orange"
  borderColor: 'red' as 'red' // (property) borderColor: "red"
}
// defaultTheme2.backgroundColor = "blue" // Error

// 互換性の無いダウンキャストはエラーになる
// const defaultTheme3 = {
//   backgroundColor: "orange" as false, // Error
//   borderColor: "red" as 0 // Error
// }

const empty = {} as { value: 'value' }
const fiction = empty.value // const fiction: "value"

// 抽象度を上げる型の付与（アップキャスト）
function toNumer(value: string): any {
  return value
}
const fiction2: number = toNumer('1,000') // const fiction2: number
fiction2.toFixed() // Runtime Error (fiction2が文字列のため)

// ----- 4-2-2 -----
type UserA = {
  name: string
}
// ageプロパティは定義されていないためエラーになる
const userA: UserA = {
  name: 'Taro',
  // age: 26, // Error
}

// [k: string]をインデックスシグネチャと呼ぶ。任意のプロパティを動的に追加することが可能になる
type UserB = {
  name: string
  [k: string]: any
}
const userB: UserB = {
  name: 'Taro',
  age: 26,
}

// インデックスシグネチャのnumber型とnameのstring型に互換性がないためエラーになる
// type UserC = {
//   name: string // Error
//   [k: string]: number
// }
// Union Typesを使用してstring型も許可するとエラーを回避できる
type UserC = {
  name: string
  [k: string]: number | string
}
const userC: UserC = {
  name: 'Taro',
  age: 26,
}
// 型が明示的なnameプロパティはstring型になる
const x = userC.name // const x: string
const y = userC.age // const y: string | number

type Answer = 'mighty' | 'lot' | 'few' | 'entirely'
type UserD = {
  name: string
  enquete: { [k: string]: Answer }
}
const userD: UserD = {
  name: 'Taro',
  enquete: {
    exercise_habits: 'entirely',
    time_of_sleeping: 'few'
  }
}
// y2もAnswer型として推論されてしまう。
const x2 = userD.enquete['exercise_habits'] // const x2: Answer
const y2 = userD.enquete['steps_per_day'] // const y2: Answer

// enquete: { [k: string]: Answer | undefined } とすることで、userE.enquete['steps_per_day']がAnswer型と推論されないようにする
type UserE = {
  name: string
  enquete: { [k: string]: Answer | undefined }
}
const userE: UserE = {
  name: 'Taro',
  enquete: {
    exercise_habits: 'entirely',
    time_of_sleeping: 'few'
  }
}
const x3 = userE.enquete['exercise_habits'] // const x3: "mighty" | "lot" | "few" | "entirely" | undefined
const y3 = userE.enquete['steps_per_day'] // const y3: "mighty" | "lot" | "few" | "entirely" | undefined

type Question = 'exercise_habits' | 'time_of_sleeping'
type UserF = {
  name: string
  enquete: { // (property) enquete: { exercise_habits?: "mighty" | "lot" | "few" | "entirely" | undefined; time_of_sleeping?: "mighty" | "lot" | "few" | "entirely" | undefined; }
    [k in Question]?: Answer // inキーワードはinの後に置かれたUnion Typeから一つずつ取り出しmapしていく。inキーワードを使用する場合、オプショナルを表す「?」を付与できるため、undefined型の付与は不要
  }
}
const userF: UserF = {
  name: 'Taro',
  enquete: {
    exercise_habits: 'entirely',
    time_of_sleeping: 'few'
  }
}
const x4 = userF.enquete['exercise_habits']
// const y4 = userF.enquete['steps_per_day'] // Error

// 最も制約の緩いインデックスシグネチャ
type UserG = {
  [k: string]: any
}
const userG: UserG = {
  name: 'Taro',
  age: 28,
  walk: () => {},
  talk: async () => {}
}

// 関数プロパティのみを受け付けるインデックスシグネチャ
type Functions = {
  [k: string]: Function
}
const functions: Functions = {
  // name: 'Taro', // Error
  // age: 28, // Error
  walk: () => {},
  talk: async () => {}
}

// Promiseを返す関数プロパティのみを受け付けるインデックスシグネチャ
type ReturnPromises = {
  [k: string]: () => Promise<any>
}
const returnPromises: ReturnPromises = {
  // name: 'Taro', // Error
  // age: 28, // Error
  // walk: () => {}, // Error
  talk: async () => {}
}

// ----- 4-2-3 -----
// const assertionによるLiteral Typesの簡略化
const tuple1 = [false, 1, '2'] as [false, 1, '2'] // const tuple1: [false, 1, "2"]
const tuple2 = [false, 1, '2'] as const // const tuple2: readonly [false, 1, "2"]

// Widening Literal Typesを抑止
const a = 'a' // const a: "a"
let b = a // let b: string
const A = 'A' as const // const A: "A"
let B = A // let B: "A"

function increment() {
  return { type: 'INCREMENT' }
}

function decrement() {
  return { type: 'DECREMENT' } as const
}

const inc = increment() // const inc: { type: string }
const dec = decrement() // const dec: { readonly type: 'DECREMENT' }

import constants from './constants'
const n = constants // const n: { readonly increment: "INCREMENT"; readonly decrement: "DECREMENT"; readonly setCount: "SET_COUNT"; }

// ----- 4-2-4 -----
function greetA(): any {
  console.log('hello')
}

const message = greetA()
console.log(message.toUpperCase()) // Runtime Error (messageはvoid型のため)

// ----- 4-2-5 -----
function greetB(name?: string) {
  // !を使用するとnullおよびundefinedの型情報のみをインラインで振り落とす。これをNon-null assertionと呼ぶ
  console.log(`Hello ${name!.toUpperCase()}`) // Runtime Error
}
greetB()

// 最も抽象的なany型を付与した上で都合の良い型に書き換える方法をdouble assertionと呼ぶ
const myName = 0 as any as string
console.log(myName.toUpperCase()) // Runtime Error


// ---------- 4-3 ----------
// ----- 4-3-1 -----
function reset(value: number | string | boolean) {
  const v0 = value // const v0: string | number | boolean
  if (typeof value === 'number') {
    const v1 = value // const v1: number
    return 0
  }

  const v2 = value // const v2: string | boolean
  if (typeof value === 'string') {
    const v3 = value // const v3: string
    return ''
  }

  const v4 = value // const v4: boolean
  return false
}
console.log(reset(1)) // 0
console.log(reset('1')) // ""
console.log(reset(true)) // false

type User1 = { gender: string }
type User2 = User1 & { name: string }
type User3 = User1 & { age: number, graduate: string }
function judgeUserType(user: User2 | User3) {
  if ('gender' in user) {
    const u0 = user // const u0: User2 | User3
    console.log('user type is User2 | User3')
  }

  if ('name' in user) {
    const u1 = user // const u1: User2
    console.log('uesr type is User2')
    return // 早期returnによる絞り込み推論
  }

  const u2 = user
  console.log('user type is User3')
}

class Creature {
  breathe() {}
}
class Animal extends Creature {
  shakeTail() {}
}
class Human extends Creature {
  greet() {}
}
function action(creature: Creature | Animal | Human) {
  const c0 = creature // const c0: Creature | Animal | Human
  c0.breathe()
  if (creature instanceof Animal) {
    const c1 = creature /// const c1: Animal
    return c1.shakeTail()
  }

  const c2 = creature // const c2: Creature | Human
  if (creature instanceof Human) {
    const c3 = creature // const c3: Human
    return c3.greet()
  }

  const c4 = creature // const c4: Creature
  return c4.breathe()
}

type UserX = {
  gender: 'male',
  name: string
}
type UserY = {
  gender: 'female'
  age: number
}
type UserZ = {
  gender: 'other'
  graduate: string
}
function judgeUserType2(user: UserX | UserY | UserZ) {
  switch (user.gender) {
    case 'male':
      const u0 = user // const u0: UserX
      return 'user type is UserX'
    case 'female':
      const u1 = user // const u1: UserY
      return 'user type is UserY'
    case 'other':
      const u2 = user // const u2: UserZ
      return 'user type is UserZ'
    default:
      const u3 = user // const u3: never
      return 'user type is never'
  }
}

type UserL = {
  gender: string
  [k: string]: any
}
type UserM = UserL & { name: string }
type UserN = UserL & { age: number }
function isUserM(user: UserM | UserN): user is UserM {
  return user.name !== undefined
}
function isUserN(user: UserM | UserN): user is UserN {
  return user.age !== undefined
}
function getUserType(user: any) {
  const u0 = user // const u0: any
  if (isUserM(user)) {
    const u1 = user // const u1: UserM
    return 'M'
  }
  if (isUserN(user)) {
    const u2 = user //const u2: UserN
    return 'N'
  }
  return 'unknown'
}
const userType = getUserType({ name: 'Taro' }) // const userType: "M" | "N" | "unknown"

type UserO = { name: string }
type UserP = UserO & { gender: 'male' | 'female' | 'other' }
type UserQ = UserO & { graduate: string }
const users: (UserP | UserQ)[] = [
  { name: 'Taro', gender: 'male' },
  { name: 'Hanako', graduate: 'Tokyo' }
]
const filteredUsers = users.filter(user => 'graduate' in user) // const filteredUsers: (UserP | UserQ)[]
const filteredUsers2 = users.filter((user: UserP | UserQ): user is UserQ => 'graduate' in user) // const filteredUsers2: UserQ[]

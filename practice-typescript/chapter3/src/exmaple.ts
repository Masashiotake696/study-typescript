// ---------- 3-1 (const/letの型推論) ----------
// ----- 3-1-1 -----
// letやvarで変数宣言した場合に型を指定しないと自動で型推論が行われる
let user1 = 'Taro' // let user1: string
let value1 = 0 // let value1: number
let flag1 = false // let flag1: boolean

// ----- 3-1-2 -----
// constで変数宣言した場合に型を指定しないと自動で型推論が行われるが、型はLiteral Typesになる
const user2 = 'Taro' // const user2: "Taro"
const value2 = 0 // const value2: 0
const flag2 = false // const flag2: false

// ----- 3-1-3 -----
// constによって適用されるLiteral Typesは通常のLiteral Typesとは少し異なるWidening Literal Types
const wideningZero = 0 // const wideningZero: 0
const nonWideningZero: 0 = 0 // const nonWideningZero: 0
const asNonWideningZero = 0 as 0 // const asNonWideningZero: 0

// 型推論によってLiteral Types（0型）と判定されたwideningZeroを代入すると、代入する変数はLiteral Typesではなくなる（number型になる）
let zeroA = 0 // let zeroA: number
let zeroB = wideningZero // let zeroB: number
let zeroC = nonWideningZero // let zeroC: 0
let zeroD = asNonWideningZero // let zeroD: 0

const zeros = {
  zeroA, // zeroA: number
  zeroB, // zeroB: number
  zeroC, // zeroC: 0
  zeroD, // zeroD: 0
}

const wideningValue = 'value'
const nonWideningValue: 'value' = 'value'
const asNonWideningValue = 'value' as 'value'
let valueA = 'value' // let valueA: string
let valueB = wideningValue // let valueB: string
let valueC = nonWideningValue // let valueC: 'value'
let valueD = asNonWideningValue // let valueD: 'value'


// ---------- 3-2 (Array/Tupleの型推論) ----------
// ----- 3-2-1 (Array) -----
const a1 = [true, false] // const a1: boolean[]
const a2 = [0, 1, '2'] // const a2: (string | number)[]
const a3 = [false, 1, '2'] // const a3: (string | number | boolean)[]

const a4 = [0 as 0, 1 as 1] // const a4: (0 | 1)[]
a4.push(1)
// a4.push(2) // Error

const zero: 0 = 0
const one: 1 = 1
const a5 = [zero, one] // const a5: (0 | 1)[]
a5.push(1)
// a5.push(2) // Error

// ----- 3-2-2 (Tuple) -----
const t1 = [false] as [boolean] // const t1: [boolean]
const t2 = [false, 1] as [boolean, number] // const t2: [boolean, number]
const t3 = [false, 1, '2'] as [boolean, number, string] // const t3: [boolean, number, string]

const v3_0 = t3[0] // const v3_0: boolean
const v3_1 = t3[1] // const v3_1: number
const v3_2 = t3[2] // const v3_2: string
// const v3_3 = t3[3] // Error

t1.push(false)
// t1.push(1) // Error
// t1.push('2') // Error

t2.push(false)
t2.push(1)
// t2.push('2') // Error

t3.push(false)
t3.push(1)
t3.push('2')

// ----- 3-2-3 -----
let list = ['this', 'is', 'a', 'test']

list.push('!')
console.log(list) // (5) ["this", "is", "a", "test", "!"]

list = list.map(item => item.toUpperCase()) // item: string
console.log(list) // (5) ["THIS", "IS", "A", "TEST", "!"]

let message = list.reduce((prev, current) => `${prev} ${current}`) // prev: string, current: string
console.log(message) // THIS IS A TEST !

// tsconfigのtargetをexnextに指定するとエラーがなくなる
// const list2 = [['this', 'is'], ['a', 'test']] // const list2: stringp[][]
// const flatten = list.flat() // const flatten: string[]


// ---------- 3-3 (objectの型推論) ----------
// ----- 3-3-1 -----
// objectの場合はプロパティの再代入が可能なため、constで宣言されたとしてもプロパティはLiteral Typesとして推論されない。アサーションを利用すればLiteral Typesとして推論される
const obj = {
  foo: false, // foo: boolean
  bar: 1, // bar: number
  baz: '2' // baz: string
}

obj['foo'] = true
// obj['foo'] = 0 // Error

const obj2 = {
  foo: false as false, // foo: false
  bar: 1 as 1, // bar: 1
  baz: '2' as '2' // baz: "2"
}

// obj2['foo'] = true // Error


// ---------- 3-4 (関数の戻り値の型推論) ----------
// ----- 3-4-1 -----
function getPriceLabel(amount: number, tax: number) { // function getPriceLabel(amount: number, tax: number): string
  return `¥${amount * tax}`
}

function log(message: string) { // function log(message: string): void
  console.log(message)
}

function getStringValue(value: number, prefix?: string): string {
  // if (prefix === undefined) return value // Error
  return `${prefix} ${value}`
}

function getScore(score: number) { // function getScore(score: number): number | null
  if (score < 0 || score > 100) return null
  return score
}

function getScoreAmount(score: 'A' | 'B' | 'C') { // function getScoreAmount(score: 'A' | 'B' | 'C'): 100 | 60 | 30
  switch (score) {
    case 'A':
      return 100
    case 'B':
      return 60
    case 'C':
      return 30
  }
}


// ---------- 3-5 (Promiseの型推論) ----------
// ----- 3-5-1 -----
function wait1(duration: number) { // function wait(duration: number): Promise<unknown>
  return new Promise(resolve => {
    setTimeout(() => resolve(`${duration}ms passed`), duration)
  })
}
wait1(1000).then(res => {
  // console.log(res.toUpperCase()) // Error
})

// ----- 3-5-2 -----
function wait2(duration: number): Promise<string> { // function wait2(duration: number): Promise<string>
  return new Promise(resolve => {
    setTimeout(() => resolve(`${duration}ms passed`), duration)
  })
}
wait2(1000).then(res => {
  console.log(res.toUpperCase())
})

function wait3(duration: number) { // function wait3(duration: number): Promise<string>
  return new Promise<string>(resolve => {
    setTimeout(() => resolve(`${duration}ms passed`), duration)
  })
}
wait3(1000).then(res => {
  console.log(res.toUpperCase())
})

// ----- 3-5-3 -----
async function queue1() {
  const message = await wait1(100) // const message: unknown
  return message
}

async function queue2() {
  const message = await wait2(100) // const message: string
  return message
}

async function queue3() {
  const message = await wait3(100) // const message: string
  return message
}

// ----- 3-5-4 -----
function waitThenString(duration: number) {
  return new Promise<string>(resolve => {
    setTimeout(() => resolve(`${duration}ms passed`), duration)
  })
}

function waitThenNumber(duration: number) {
  return new Promise<number>(resolve => {
    setTimeout(() => resolve(duration), duration)
  })
}

function waitAll() { // function waitAll(): Promise<[string, number, string]>
  return Promise.all([
    waitThenString(10),
    waitThenNumber(100),
    waitThenString(1000)
  ])
}

function waitRace() { // function waitRace(): Promise<string | number>
  return Promise.race([
    waitThenString(10),
    waitThenNumber(100),
    waitThenString(1000)
  ])
}

async function main() {
  const [a, b, c] = await waitAll() // a: string, b: number, c: string
  const result = await waitRace() // result: string | number
}


// ---------- 3-6 (import構文の型推論) ----------
// ----- 3-6-1 -----
import { value, label, returnFalse } from './test'
const v1 = value // const v1: 10
const v2 = label // const v2: "label"
const v3 = returnFalse // const v3: () => boolean

// ----- 3-6-2 -----
import('./test').then(module => {
  const amount = module.value // const amount: 10
})
async function main2() {
  const { value } = await (import('./test'))
  const amount = value // const amount: 10
}


// ---------- 3-7 (JSONの型推論) ----------
// ----- 3-7-1 -----
// 型定義で表現
interface User {
  id: number
  created_at: string
  profile: {
    name: {
      first: string,
      last: string
    },
    age: number,
    gender: string,
    enabled: boolean
  }
}
type Users1 = User[]

// JSONファイルを使用
import UsersJson from './users.json'
type Users2 = typeof UsersJson // Users2はUser1と同等の型
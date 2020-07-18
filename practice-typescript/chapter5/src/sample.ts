// ---------- 5-1 ----------
// ----- 5-1-1 -----
// String Literal Typesはstring型の派生型
// 詳細な型('test'型)に抽象的な型(string型)を代入するとコンパイルエラーになる
let s1: 'test' = 'test'
let s2: string = s1
let s3: string = 'test'
// let s4: 'test' = s3 // Error

let n1: 0 = 0
let n2: number = n1
let n3: number = 0
// let n4: 0 = n3 // Error

// any型はどんな型にも宣言・代入ができる
// a1の実態はboolean型だが、a2やa3では異なる型に変換される
let a1: any = false // let a1: any
let a2: string = a1 // let a2: string
let a3 = a1 as number // let a3: number

// unknown型はどんな型の値も受け入れるTopTypeで、型の中で最も抽象的
// any型とは異なり型が決定するまでは別の型に代入できない
let un1: unknown = 'test'
// let un2: string = un1 // Error (un1の型が決定していないため)
let un3: number = un1 as number // エラーにならない（アサーションでnumber型として宣言されているため）

// アサーション付与時に、値と互換性の無い型宣言をするとコンパイルエラーになる（0 as stringなど）
// '0' as {} は、文字列型が{}型のサブタイプであるためコンパイルエラーにならない
const x1 = '0' // const x1: "0"
const x2 = '0' as string // const x2: string
// const x3 = 0 as string // Error
const x4 = '0' as {} // const x4: {}


// ----- 5-1-2 -----
// これらは全てコンパイルエラーにならない
let o1: {} = 0
let o2: {} = '1'
let o3: {} = false
let o4: {} = {}

// keyofは型プロパティの名称一覧を抽出するキーワード。K2, K3, K4は数値, 文字列, 真偽値が持つメソッド名一覧を取得している
// つまり、プリミティブ型は{}型のサブタイプであると言える（数値も文字列も真偽値も{}型である）
type K0 = keyof {} // type K0 = never
type K1 = keyof { K: 'K' } // type K1 = "K"
type K2 = keyof 0 // type K2 = "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
type K3 = keyof '1' // type K3 = number | "toString" | "charAt" | "charCodeAt" | "concat" | "indexOf" | "lastIndexOf" | "localeCompare" | "match" | "replace" | "search" | "slice" | "split" | "substring" | "toLowerCase" | ... 25 more ... | "sup"
type K4 = keyof false // type K4 = "valueOf"

// プロパティp1が異なる型なので代入はできない
let O1 = { p1: 0 }
let O2 = { p1: 'test' }
// O1 = O2 // Error
// O2 = O1 // Error

// 互いに一致するプロパティが存在しないため代入できない
let O3 = { p1: 'test' }
let O4 = { p2: 'test' }
// O3 = O4 // Error
// O4 = O3 // Error

// O6はO5が持つプロパティを満たしているため、互換性があると判断される
let O5 = { p1: 'test' }
let O6 = { p1: 'test', p2: 0 }
O5 = O6
// O6 = O5 // Error

let O7 = {}
let O8 = { p1: 'test' }
O7 = O8
// O8 = O7 // Error


// ----- 5-1-3 -----
// 引数に互換性がないので代入できない
let fn1 = (a1: number) => {}
let fn2 = (a1: string) => {}
// fn2 = fn1 // Error
// fn1 = fn2 // Error

// 全ての引数型が互換性のチェック対象になる。ただし、引数の名前は関係なく、引数型のチェックのみ行う
// fn3はfn4の引数を部分的に満たしているので代入可能
let fn3 = (a: number) => {}
let fn4 = (b: number, s: string) => {}
fn4 = fn3
// fn3 = fn4 // Error

// ----- 5-1-4 -----
// クラスの互換性はインスタンスメンバーが比較対象となる
type Gender = 'male' | 'female' | 'other'
class Animal {
  feet: number = 4
  constructor(name: string, numFeet: number) {}
}
class Human {
  feet: number = 2
  hands: number = 2
  constructor(name: string, gender: Gender) {}
}
let animal: Animal = new Animal('dog', 4)
let human: Human = new Human('Taro', 'male')
// human = animal // Error
animal = human


// ---------- 5-2 ----------
// ----- 5-2-1 -----
const Test = {} // Value宣言空間
interface Test {} // Type宣言空間
namespace Test { } // Namespace宣言空間

// 型を宣言するためには、interfaceもしくはtype aliasを用いる。両者の違いは、open endedに準拠しているかいないか
// interfaceはopen endedに準拠しているので、型拡張（オーバーロード）が可能だが、type aliasはopen endedに準拠していない。
// オーバーロード可
interface User {
  name: string
}
interface User {
  age: number
}

// オーバーロード不可
// type User2 = {
//   name: string
// }
// type User2 = {
//   age: number
// }

interface TestA {
  value: string
}
namespace TestA {
  export interface Properties {
    name: string
  }
}
const testA: TestA = {
  value: 'value'
}
const properties: TestA.Properties = {
  name: 'Taro'
}

// ----- 5-2-2 -----
// 同じ名前のinterfaceは、両方の型宣言のメンバーが単一のinterfaceに自動的に結合される
interface Bounds {
  width: number
  height: number
  move(amount: string): string
}
interface Bounds {
  left: number
  top: number
  // width: string // Error (すでに宣言されているメンバーを異なる形で宣言しようとしたため)
  move(amount: number): string
}
const bounds: Bounds = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  // 同じ名前の各関数メンバーは、同じ関数のオーバーロードを表すものとして扱われる
  move: (amount: string| number) => {
    return `${amount}`
  }
}

// ----- 5-2-3 -----
// 同じ名前のnamespaceはそのメンバーを自動的に結合する
namespace Publisher {
  export const name = ''
  interface Appearance {
    color: 'monochrome' | '4colors' | 'fullcolors'
  }
  export interface Book {
    title: string
    appearance: Appearance
  }
}
namespace Publisher {
  export interface CookingBook extends Book {
    category: 'cooking'
    // appearance: Appearance // Error (Appearance型はエクスポートされていないため、他のnamespaceからは参照不可)
  }
}
namespace Publisher {
  export interface Book {
    lang: 'ja'
  }
  export interface TravelBook extends Book {
    category: 'travel'
  }
}
const cookingBook: Publisher.CookingBook = {} as Publisher.CookingBook // const cookingBook: { title: string; appearance: Appearance; lang: 'ja'; category: 'cooking'; }
const travelBook: Publisher.TravelBook = {} as Publisher.TravelBook // const travelBook: { title: string; appearance: Appearance; lang: 'ja'; category: 'travel'; }
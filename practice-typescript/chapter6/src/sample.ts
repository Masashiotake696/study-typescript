// ---------- 6-1 (Generics) ----------
// ----- 6-1-1 (変数のGenerics) -----
// Tには任意の型が入るため、valueプロパティの型が可変になる
interface Box<T> {
  value: T
}
// const box0: Box = { value: 'test' } // Error (Genericsを指定していない)
const box1: Box<string> = { value: 'test' }
// const box2: Box<number> = { value: 'test' } // Error (number型でなければならない)

// 初期方を指定
interface Box2<T = string> {
  value: T
}
const box2_0: Box2 = { value: 'test' } // Genericsを省略できる
const box2_1: Box2<string> = { value: 'test' }
// const box2_2: Box2<number> = { value: 'test' } // Error (number型でなければならない)

// extendsによる制約
interface Box3<T extends string | number> {
  value: T
}
const box3_0: Box3<string> = { value: 'test' }
const box3_1: Box3<number> = { value: 0 }
// const box3_2: Box3<boolean> = { value: false } // Error (string | number 型と互換でなければならない)

// ----- 6-1-2 (関数のGenerics) -----
function boxed<T>(props: T) {
  return { value: props }
}

// 関数定義にGenericsが含まれていても、利用時に型指定は必須ではない
const boxed1_0 = boxed('test') // const boxed1_0: { value: string }
const boxed1_1 = boxed(0) // const boxed1_1: { value: number }
const boxed1_2 = boxed(false) // const boxed1_2: { value: boolean }
const boxed1_3 = boxed(null) // const boxed1_3: { value: null }

// 明示的に型を指定したい場合はアサーションを使用
const boxed1_4 = boxed(false as boolean | null) // const boxed1_4: { value: boolean | null }
const boxed1_5 = boxed<string | null>(null) // const boxed1_5: { value: string | null }

// 関数を変数に代入することも可能
const boxed2 = <T>(props: T) => ({ value: props })

// extendsによる制約
function boxed3<T extends string>(props: T) {
  return { value: props }
}
// const boxed3_0 = boxed3(0) // Error (string型と互換でないといけない)
const boxed3_1 = boxed3('test') // const boxed3_1: { value: "test" }

interface Props {
  amount: number
}
function boxed4<T extends Props>(props: T) { // 引数propsがnumber型のamountプロパティを持つことが確約されている
  return { value: props.amount.toFixed(1) }
}
const boxed4_0 = boxed4({ amount: 0 })
// const boxed4_1 = boxed4({ value: 0 }) // Error (amountプロパティがないので、Props型を満たしていない)
// const boxed4_2 = boxed4({ amount: 'test' }) // Error (amountプロパティがnumber型でない)

// ----- 6-1-3 (複数のGenerics) -----
// 複数の引数と同様に、複数のGenericsを指定することが可能
// 第二引数keyは、第一引数で指定されたT型オブジェクトpropsが持つプロパティのいずれかのLiteral Types型である
function pick<T, K extends keyof T>(props: T, key: K) {
  return props[key]
}

const obj = {
  name: 'Taro',
  amount: 0,
  flag: false
}
const value1 = pick(obj, 'name') // const value1: string
const value2 = pick(obj, 'amount') // const value2: number
const value3 = pick(obj, 'flag') // const value3: boolean
// const value4 = pick(obj, 'test') // Error (testプロパティはobjオブジェクトに存在しない)

// ----- 6-1-4 (クラスのGenerics)-----
// クラス宣言にGenericsを使用するとコンストラクターの引数を制約できる
class Person<T extends string> {
  name: T
  constructor(name: T) {
    this.name = name
  }
}
const person = new Person('Taro')
const personName = person.name // const personName: "Taro"

interface PersonProps {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
}
class Person2<T extends PersonProps> {
  name: T['name'] // name: string
  age: T['age'] // age: number
  gender: T['gender'] // gender: 'male' | 'female' | 'other'

  constructor(props: T) {
    this.name = props.name
    this.age = props.age
    this.gender = props.gender
  }
}
const person2 = new Person2({
  name: 'Taro',
  age: 28,
  gender: 'female'
})


// ---------- 6-2 (Conditional Types) ----------
// ----- 6-2-1 -----
// Conditional Typesは型の互換性を条件分岐にかけ、型推論を導出する型
type isString<T> = T extends string ? true : false
type X = isString<'test'> // type X = true
type Y = isString<0> // type Y = false

interface Properties {
  name: string
  age: number
  flag: boolean
}
// 第二引数で指定された型(U)と第一引数で指定されたオブジェクトのプロパティの型(T[K])の互換性がある場合にtrueを返し、そうでない場合にfalseを返す
type IsType<T, U> = {
  [K in keyof T]: T[K] extends U ? true : false
}
type IsString = IsType<Properties, string> // type IsString = { name: true; age: false; flag: false; }
type IsNumber = IsType<Properties, number> // type IsNumber = { name: false; age: true; flag: false; }
type IsBoolean = IsType<Properties, boolean> // type IsBoolean = { name: false; age: false; flag: true; }

// ----- 6-2-2 -----
// オブジェクト型のタイプに対して要素を指定すると、該当した値のUnion Typesになる
type test = { // type test = "aaaaa" | "bbbbb"
  aaa: 'aaaaa'
  bbb: 'bbbbb'
  ccc: 'ccccc'
}['aaa' | 'bbb']

interface Properties2 {
  name: string
  age: number
  walk: () => void
  jump: () => Promise<void>
}
// never型はUnion Typesの場合無視される("name" | never | never | never -> "name")
type Filter<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

type StringKeys = Filter<Properties2, string> // type StringKeys = "name" ("name" | never | never | never -> "name")
type NumberKeys = Filter<Properties2, number> // type NumberKeys = "age" (never | "age" | never | never -> "age")
type FunctionKeys = Filter<Properties2, Function> // type FunctionKeys = "walk" | "jump" (never | never | "walk" | "jump" -> "walk" | "jump")
type ReturnPromiseKeys = Filter<Properties2, () => Promise<any>> // type ReturnPromiseKeys = "jump" (never | never | never | "jump" -> "jump")

type Strings = Pick<Properties2, StringKeys> // type Strings = { name: string; }
type Numbers = Pick<Properties2, NumberKeys> // type Numbers = { age: number; }
type Functions = Pick<Properties2, FunctionKeys> // type Functions = { walk: () => void; jump: () => Promise<void>; }
type ReturnPromises = Pick<Properties2, ReturnPromiseKeys> // type ReturnPromises = { jump: () => Promise<void>; }

// ----- 6-2-3 -----
interface DeepNest {
  deep: { nest: { value: string } }
}
interface ShallowNest {
  shallow: { value: string }
}
interface Properties3 {
  deep: DeepNest
  shallow: ShallowNest
}

type Salvage<T extends DeepNest> = T['deep']['nest']['value']
type DeepDive<T> = {
  [K in keyof T]: T[K] extends DeepNest ? Salvage<T[K]> : never
}[keyof T]
type XXX = DeepDive<Properties3> // type XXX = string

// ----- 6-2-4 -----
function greet() {
  return 'Hello!'
}
type Return<T> = T extends (...arg: any[]) => infer U ? U : never
type R = Return<typeof greet> // type R = string

function greet2(name: string, age: number) {
  return `Hello! I'm ${name}. ${age} years old.`
}

type A1<T> = T extends (...arg: [infer U, ...any[]]) => any ? U : never
type A2<T> = T extends (...arg: [any, infer U, ...any[]]) => any ? U : never
type A3<T> = T extends (...arg: infer U) => any ? U : never

type O = A1<typeof greet2> // type O = string
type P = A2<typeof greet2> // type P = number
type Q = A3<typeof greet2> // type Q = [string, number]

async function greet3() {
  return 'Hello!'
}

type ResolveArg<T> = T extends () => Promise<infer U> ? U : never
type S = typeof greet3 // type S = () => Promise<string>
type T = ResolveArg<S> // type T = string

// ---------- 6-3 (Utility Types) ----------
// ----- 6-3-1 -----
interface User {
  name: string
  age: number | null
  gender: 'male' | 'female' | 'other'
  birthplace?: string
}

// 全てのプロパティをReadonlyに変換し、新しい型を生成する
type ReadonlyWrapUser = Readonly<User> // type ReadonlyWrapUser = { readonly name: string; readonly age: number | null; readonly gender: 'male' | 'female' | 'other'; readonly brithplace?: string | undefined; }
// 全てのプロパティをOptionalに変換し、新しい型を生成する
type PartialWrapUser = Partial<User> // type PartialWrapUser = { name?: string | undefined; age?: number | null | undefined; gender?: "male" | "female" | "other" | undefined; brithplace?: string | undefined; }
// 全てのプロパティを必須に変換し（Optionalを無くす）、新しい型を生成する
type RequiredWrapUser = Required<User> // type RequiredWrapUser = { name: string; age: number | null; gender: 'male' | 'female' | 'other'; brithplace: string; }

// 第一Genericsに指定したプロパティ名で新しいObject型を生成する
type UserRecord = Record<'user', User> // type UserRecord = { user: User; }
// 第二Genericsに指定したプロパティ名を第一Genericsに指定した型から抽出し、新しいObject型を生成する
type UserGender = Pick<User, 'gender'> // type UserGender = { gender: 'male' | 'female' | 'other'; }
// 第二Genericsに指定したプロパティ名を第一Genericsに指定した型から除外し、新しいObject型を生成する
type WithoutBirthplace = Omit<User, 'birthplace'> // type WithoutBirthplace = { name: string; age: number | null; gender: 'male' | 'female' | 'other'; }

// ----- 6-3-2 -----
// 第一Genericsの型から第二Genericsで指定した型を除いた型を取得する
type P1 = Exclude<"a" | "b", "b"> // type P1 = "a"
type Q1 = Exclude<"a" | (() => void), Function> // type Q1 = "a"

// 第一Genericsの型から第二Genericsで指定した型のみを抽出した型を取得する
type P2 = Extract<"a" | "b", "b"> // type P2 = "b"
type Q2 = Extract<"a" | (() => void), Function> // type Q2 = () => void

// 与えられた型からnull型とundefined型を除いた型を取得する
type P3 = NonNullable<string | null | undefined> // type P3 = string

// 関数の返却型を取得する
type P4 = ReturnType<() => string> // type P4 = string
// type Q4 = ReturnType<string> // Error

// コンストラクター関数型のインスタンス型を取得する
class C {
  x = 0
  y = 0
}
type P5 = InstanceType<typeof C>
const n = {} as P5 // const n: C

// ----- 6-3-3 -----
// Genericsに互換性のある型が適用された場合、それに対応するString Literal Typesを返却する型
type TypeName<T> =
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends undefined ? "undefined":
  T extends Function ? "function" :
  "object"
type T0 = TypeName<string> // type T0 = "string"
type T1 = TypeName<"a"> // type T1 = "string"
type T2 = TypeName<true> // type T2 = "boolean"
type T3 = TypeName<() => void> // type T3 = "function"
type T4 = TypeName<string[]> // type T4 = "object"

// Object型から関数型のみのプロパティ名を抽出し、その名称を元に関数型のみの新しい型を作る型
interface Part {
  id: number
  name: string
  subparts: Part[]
  updatePart(newName: string): void
}
type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>
type V1 = FunctionPropertyNames<Part> // type V1 = "updatePart"
type W1 = FunctionProperties<Part> // type W1 = { updatePart: (newName: string) => void; }

// Object型から関数型のみのプロパティ名を抽出し、その名称を元に関数型以外の新しい型を作る型
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K
}[keyof T]
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

type V2 = NonFunctionPropertyNames<Part> // type V2 = "id" | "name" | "subparts"
type W2 = NonFunctionProperties<Part> // type W2 = { id: number; name: string; subparts: Part[]; }

// 配列要素型、関数戻り型、Promise.resolve引数型を取得する型
type Unpacked<T> =
  T extends (infer U)[] ? U :
  T extends (...args: any[]) => infer U ? U :
  T extends Promise<infer U> ? U :
  T
type T5 = Unpacked<string> // type T5 = string
type T6 = Unpacked<string[]> // type T6 = string
type T7 = Unpacked<() => string> // type T7 = string
type T8 = Unpacked<Promise<string>> // type T8 = string
type T9 = Unpacked<Promise<string>[]> // type T9 = Promise<string>
type T10 = Unpacked<Unpacked<Promise<string>[]>> // type T10 = string

// ----- 6-3-4 -----
interface User2 {
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  birth: {
    day: Date
    place?: {
      country?: string | null
      state?: string
    }
  }
}

// Object型およびArray型に該当するか否かを判定する型。該当しなければPrimitive型とみなす
type Unbox<T> = T extends {[k: string]: infer U} ? U :
                T extends (infer U)[] ? U :
                T
type isPrimitive<T> = T extends Unbox<T> ? T : never

// 再帰的にReadonly変換する型
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends isPrimitive<T[P]> ? T[P] : DeepReadonly<T[P]>
}
type DeepReadonlyWrapUser = DeepReadonly<User2>

// 再帰的にRequired変換する型
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends isPrimitive<T[P]> ? T[P] : DeepRequired<T[P]>
}
type DeepRequiredWrapUser = DeepRequired<User2>

// 再帰的にPartial変換する型
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends isPrimitive<T[P]> ? T[P] : DeepPartial<T[P]>
}
type DeepPartialWrapUser = DeepPartial<User2>

// 再帰的にNullable変換する型
type DeepNullable<T> = {
  [P in keyof T]?: T[P] extends isPrimitive<T[P]> ? T[P] | null : DeepNullable<T[P]>
}
type DeepNullableWrapUser = DeepNullable<User2>

// 再帰的にNonNullable変換する型
type DeepNonNullable<T> = {
  [P in keyof T]-?: T[P] extends isPrimitive<T[P]> ? Exclude<T[P], null | undefined> : DeepNonNullable<T[P]>
}
type DeepNonNullableWrapUser = DeepNonNullable<User2>

// ----- 6-3-5 -----
// オブジェクトの子ノードをUnion Typesで取得する型
type Unbox2<T> = T extends { [K in keyof T]: infer U } ? U : never
type TT = Unbox2<{ a: 'A'; b: 'B'; c: 'C'; }> // type TT = "A" | "B" | "C"

// Union TypesをIntersection Typesに変換する型
type UTI<T> = T extends any ? (args: T) => void : never
type UnionToIntersection<T> = UTI<T> extends (args: infer I) => void ? I : never
type A_or_B = { a: 'a' } | { b: 'b' }
type A_and_B = UnionToIntersection<A_or_B>

// Genericsに指定した型に該当する要素を、最低でも一つ含む必要がある型
type NonEmptyList<T> = [T, ...T[]]
// const list1: NonEmptyList<string> = [] // Error
const list2: NonEmptyList<string> = ['test']

// Setの値型を取得する型
type PickSet<T> = T extends Set<infer I> ? I : never
const set = new Set([1, 2] as const) // const set: Set<1 | 2>
type SetValues = PickSet<typeof set> // type SetValues = 1 | 2

// Mapのキーを取得する型
const map = new Map([[0, 'foo'], [1, 'bar']] as const) // const map: Map<0 | 1, "foo" | "bar">
type PickMapKeys<T> = T extends Map<infer K, any> ? K : never
type MapKeys = PickMapKeys<typeof map> // type MapKeys = 0 | 1
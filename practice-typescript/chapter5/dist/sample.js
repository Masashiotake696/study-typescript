"use strict";
// ---------- 5-1 ----------
// ----- 5-1-1 -----
// String Literal Typesはstring型の派生型
// 詳細な型('test'型)に抽象的な型(string型)を代入するとコンパイルエラーになる
let s1 = 'test';
let s2 = s1;
let s3 = 'test';
// let s4: 'test' = s3 // Error
let n1 = 0;
let n2 = n1;
let n3 = 0;
// let n4: 0 = n3 // Error
// any型はどんな型にも宣言・代入ができる
// a1の実態はboolean型だが、a2やa3では異なる型に変換される
let a1 = false; // let a1: any
let a2 = a1; // let a2: string
let a3 = a1; // let a3: number
// unknown型はどんな型の値も受け入れるTopTypeで、型の中で最も抽象的
// any型とは異なり型が決定するまでは別の型に代入できない
let un1 = 'test';
// let un2: string = un1 // Error (un1の型が決定していないため)
let un3 = un1; // エラーにならない（アサーションでnumber型として宣言されているため）
// アサーション付与時に、値と互換性の無い型宣言をするとコンパイルエラーになる（0 as stringなど）
// '0' as {} は、文字列型が{}型のサブタイプであるためコンパイルエラーにならない
const x1 = '0'; // const x1: "0"
const x2 = '0'; // const x2: string
// const x3 = 0 as string // Error
const x4 = '0'; // const x4: {}
// ----- 5-1-2 -----
// これらは全てコンパイルエラーにならない
let o1 = 0;
let o2 = '1';
let o3 = false;
let o4 = {};
// プロパティp1が異なる型なので代入はできない
let O1 = { p1: 0 };
let O2 = { p1: 'test' };
// O1 = O2 // Error
// O2 = O1 // Error
// 互いに一致するプロパティが存在しないため代入できない
let O3 = { p1: 'test' };
let O4 = { p2: 'test' };
// O3 = O4 // Error
// O4 = O3 // Error
// O6はO5が持つプロパティを満たしているため、互換性があると判断される
let O5 = { p1: 'test' };
let O6 = { p1: 'test', p2: 0 };
O5 = O6;
// O6 = O5 // Error
let O7 = {};
let O8 = { p1: 'test' };
O7 = O8;
// O8 = O7 // Error
// ----- 5-1-3 -----
// 引数に互換性がないので代入できない
let fn1 = (a1) => { };
let fn2 = (a1) => { };
// fn2 = fn1 // Error
// fn1 = fn2 // Error
// 全ての引数型が互換性のチェック対象になる。ただし、引数の名前は関係なく、引数型のチェックのみ行う
// fn3はfn4の引数を部分的に満たしているので代入可能
let fn3 = (a) => { };
let fn4 = (b, s) => { };
fn4 = fn3;
class Animal {
    constructor(name, numFeet) {
        this.feet = 4;
    }
}
class Human {
    constructor(name, gender) {
        this.feet = 2;
        this.hands = 2;
    }
}
let animal = new Animal('dog', 4);
let human = new Human('Taro', 'male');
// human = animal // Error
animal = human;
// ---------- 5-2 ----------
// ----- 5-2-1 -----
const Test = {}; // Value宣言空間
const testA = {
    value: 'value'
};
const properties = {
    name: 'Taro'
};
const bounds = {
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    // 同じ名前の各関数メンバーは、同じ関数のオーバーロードを表すものとして扱われる
    move: (amount) => {
        return `${amount}`;
    }
};
// ----- 5-2-3 -----
// 同じ名前のnamespaceはそのメンバーを自動的に結合する
var Publisher;
(function (Publisher) {
    Publisher.name = '';
})(Publisher || (Publisher = {}));
const cookingBook = {}; // const cookingBook: { title: string; appearance: Appearance; lang: 'ja'; category: 'cooking'; }
const travelBook = {}; // const travelBook: { title: string; appearance: Appearance; lang: 'ja'; category: 'travel'; }

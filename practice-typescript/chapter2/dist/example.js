"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// ---------- 2-1 (関数の引数と戻り値の型定義) ----------
// ----- 2-1-1 -----
// 引数に型を定義
function expo2(amount) {
    return Math.pow(amount, 2);
}
console.log(expo2(1000));
// console.log(expo2('1,000')) // Error
// ----- 2-1-2 -----
// 引数と戻り値に型を定義
function taxed(amount) {
    return amount * 1.1;
}
function fee(amount) {
    return amount * 1.4;
}
function price(amount) {
    return fee(amount);
}
var demand = '¥' + taxed(price(1000));
// ---------- 2-2 (プリミティブ型 ※object型以外) ----------
// ----- 2-2-1 -----
var flag = false;
// ----- 2-2-2 -----
var decimal = 256;
var hex = 0xfff;
var binary = 0;
var octal = 83;
// ----- 2-2-3 -----
var color = "white";
color = 'black';
var myColor = "my color is " + color;
// ----- 2-2-4 -----
// 配列型の定義は2パターン
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
// ----- 2-2-5 -----
// tuple型
var x;
x = ["hello", 10];
// x = [10, "hello"] // Error
console.log(x[0].substr(1));
// console.log(x[1].substr(1))  // Error
// x[3] = "world"  // Error
// console.log(x[5].toString())  // Error
// ----- 2-2-6 -----
var whatever = 0;
whatever = "something";
whatever = false;
// ----- 2-2-7 -----
// unknown型はany型のタイプセーフ対応版のようなもの。型アサーションなどがないと利用できない
// const certainlyNumbers: number[] = ['0'] // Error
var maybeNumbers = ['0'];
var probablyNumbers = ['0'];
maybeNumbers[0].toFixed(1);
// probablyNumbers[0].toFixed(1) // Error
// ----- 2-2-8 -----
// void型は型がないことを表す（undefinedのみ代入可能）。値を返さない関数の戻り型として使用する
function logger(message) {
    console.log(message);
}
var unusable;
unusable = undefined;
// unusable = null // Error
// ----- 2-2-9 -----
// undefined型とnull型は単体ではあまり役に立たない。後述するUnion Typesで使用する
var u = undefined;
var n = null;
// ----- 2-2-10 -----
// never型は発生し得ない値の型を表す。戻り値がない関数の戻り型として使用する
function error(message) {
    throw new Error(message);
}
function infiniteLoop() {
    while (true) {
    }
}
// ----- 2-2-11 -----
// object型は非プリミティブ型を表す
var objectBrace;
var objectType;
objectBrace = true;
objectBrace = 0;
function returnNever() {
    throw new Error();
}
var unexistenceType = returnNever(); // プリミティブ型のIntersection Typesはnever型として解釈される
// let problematicNumber: string & number ='0' // Error
// ----- 2-3-2 -----
// Union Types（共用体）。複数の型のうちの一つの型が成立することを示す
var value;
value = false;
value = 1;
value = 'test';
var numberOrStrings; // Array型の要素の型としても使用可能
numberOrStrings = [0, '1'];
// numberOrStrings = [0, '1', false] // Error
var nullableString;
nullableString = null;
nullableString = 'notNull';
var nullableStrings = [];
nullableStrings.push('1');
nullableStrings.push(null);
// nullableStrings.push(false) // Error
// ----- 2-3-3 -----
// Literal Types（リテラル）。正確な値を指定できる（文字列、数値、審議値など）
var myName;
myName = 'Taro';
// myName = 'Jiro' // Error
myName.toLowerCase(); // String Literal Typesはstring型のサブタイプであるため、文字列が持つ関数にアクセスできる
var users; // 定数のように扱える
users = 'Hanako';
var zero;
zero = 0;
// zero = 1 // Error
zero.toFixed(1);
var bit; // Number Literal Typesはnumber型のサブタイプであるため、数値が持つ関数にアクセスできる
bit = 8;
// bit = 12 // Error
var truth;
truth = true;
// truth = false // Error
// ---------- 2-4 (typeofキーワードとkeyofキーワード) ----------
// ----- 2-4-1 -----
// typeofキーワード。宣言済み変数の型を取得できる
var asString = '';
var string; // string型
string = 'string';
// string = 0 // Error
var myObject = { foo: 'foo' };
var anotherObject = { foo: '' }; // string型のfooプロパティを持つobject型
anotherObject['foo'] = 'value';
var someKey; // 'foo' | 'bar' | 'baz' 型
someKey = 'bar';
var ownObject = {
    foo: 'FOO',
    bar: 'BAR',
    baz: 'BAZ'
};
var ownObjectKey; // 'foo' | 'bar' | 'baz' 型。typeof ownObjectで、string型のfooプロパティとstring型のbarプロパティとstring型のbazプロパティを持つobject型を取得。
ownObjectKey = 'bar';
// ownObjectKey = 'qux' // Error
var indexedObject = {
    0: 0,
    1: 1
};
var indexedKey;
indexedKey = 0;
// indexedKey = 2 // Error
// ---------- 2-5 (アサーション) ----------
// ----- 2-5-1 -----
// アサーションはダウンキャスト可能な互換性がある場合に限って、「この型である」と宣言することができ、これによりTypeScriptはプログラマーが型についてチェックを行ったと判定する。構文は2パターン
var someValue = "this is a string";
var strLength1 = someValue.length; // any型をstring型にダウンキャスト
var strLength2 = someValue.length; // any型をstring型にダウンキャスト
// ---------- 2-6 (クラス) ----------
var Creature = /** @class */ (function () {
    function Creature(numberOfHands, numberOfFeet) {
        this.numberOfHands = numberOfHands;
        this.numberOfFeet = numberOfFeet;
    }
    return Creature;
}());
var creature = new Creature(0, 4);
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(bark) {
        var _this = _super.call(this, 0, 4) || this;
        _this.bark = bark;
        return _this;
    }
    Dog.prototype.barking = function () {
        return this.bark + "! " + this.bark + "!";
    };
    Dog.prototype.shakeTail = function () {
        console.log(this.barking());
    };
    return Dog;
}(Creature));
var Human = /** @class */ (function (_super) {
    __extends(Human, _super);
    function Human(name) {
        var _this = _super.call(this, 2, 2) || this;
        _this.name = name;
        return _this;
    }
    Human.prototype.greet = function () {
        return "Hello! I'm " + this.name + ".";
    };
    Human.prototype.shakeHands = function () {
        console.log(this.greet());
    };
    return Human;
}(Creature));
var dog = new Dog('bow-wow');
var human = new Human('');
var Taro = /** @class */ (function (_super) {
    __extends(Taro, _super);
    function Taro() {
        return _super.call(this, 'Taro') || this;
    }
    Taro.prototype.greeting = function () {
        console.log(this.greet());
    };
    return Taro;
}(Human));
var taro = new Taro();
taro.greeting();
// taro.greet() // Error
taro.shakeHands();
// ---------- 2-7 (列挙型) ----------
// ----- 2-7-1 (数値列挙) -----
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
var left = Direction.Left; // const left: Direction.Left
// ----- 2-7-2 (文字列列挙) -----
var Ports;
(function (Ports) {
    Ports["USER_SERVICE"] = "8080";
    Ports["REGISTER_SERVICE"] = "8081";
    Ports["MEDIA_SERVICE"] = "8888";
})(Ports || (Ports = {}));
var registerService = Ports.REGISTER_SERVICE; // const registerService: Ports.REGISTER_SERVICE
// ----- 2-7-3 (open ended) -----
var AnimalBarks;
(function (AnimalBarks) {
    AnimalBarks["CAT"] = "nya~nya~";
})(AnimalBarks || (AnimalBarks = {}));
(function (AnimalBarks) {
    AnimalBarks["DOG"] = "wan!wan!";
})(AnimalBarks || (AnimalBarks = {}));
(function (AnimalBarks) {
    AnimalBarks["PIG"] = "bu~bu~";
})(AnimalBarks || (AnimalBarks = {}));
var catBark = AnimalBarks.CAT; // const catBark: AnimalBarks.CAT

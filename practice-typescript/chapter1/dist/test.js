"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test2 = exports.test1 = void 0;
var sample_1 = require("./sample");
var a = sample_1.sampleFunction();
var b = sample_1.sampleText;
function test1() {
    return 'test1';
}
exports.test1 = test1;
function test2() {
    return { value: 'test2' };
}
exports.test2 = test2;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.create = void 0;
const api_1 = require("sst/node/api");
const todo_1 = require("@fincast/core/todo");
exports.create = (0, api_1.ApiHandler)((_evt) => __awaiter(void 0, void 0, void 0, function* () {
    yield todo_1.Todo.create();
    return {
        statusCode: 200,
        body: "Todo created",
    };
}));
exports.list = (0, api_1.ApiHandler)((_evt) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        statusCode: 200,
        body: JSON.stringify(todo_1.Todo.list()),
    };
}));

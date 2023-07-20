"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MyStack_1 = require("./stacks/MyStack");
exports.default = {
    config(_input) {
        return {
            name: "fincast",
            region: "us-east-1",
        };
    },
    stacks(app) {
        app.stack(MyStack_1.API);
    }
};

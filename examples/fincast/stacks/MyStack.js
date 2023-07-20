"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const constructs_1 = require("sst/constructs");
function API({ stack }) {
    const bus = new constructs_1.EventBus(stack, "bus", {
        defaults: {
            retries: 10,
        },
    });
    const api = new constructs_1.Api(stack, "api", {
        defaults: {
            function: {
                bind: [bus],
            },
        },
        routes: {
            "GET /": "packages/functions/src/lambda.handler",
            "GET /todo": "packages/functions/src/todo.list",
            "POST /todo": "packages/functions/src/todo.create",
        },
    });
    bus.subscribe("todo.created", {
        handler: "packages/functions/src/events/todo-created.handler",
    });
    stack.addOutputs({
        ApiEndpoint: api.url,
    });
}
exports.API = API;
